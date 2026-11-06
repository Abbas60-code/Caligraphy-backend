import express from 'express';
import Painting from '../models/Painting.js';
import { cloudinary, upload } from '../config/cloudinary.js';

const router = express.Router();

// ─── GET all paintings ────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const paintings = await Painting.find().sort({ createdAt: -1 });
    res.json({ success: true, data: paintings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET single painting ──────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id);
    if (!painting)
      return res.status(404).json({ success: false, message: 'Painting not found.' });
    res.json({ success: true, data: painting });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── Helper to parse tags ─────────────────────────────────────────
function parseTags(body) {
  if (body['tags[]']) {
    return Array.isArray(body['tags[]']) ? body['tags[]'] : [body['tags[]']];
  }
  if (body.tags) {
    return typeof body.tags === 'string' ? body.tags.split(',').map((t) => t.trim()).filter(Boolean) : body.tags;
  }
  return [];
}

// ─── Helper to parse string array from FormData ──────────────────
function parseArrayField(body, fieldName) {
  const bracketField = `${fieldName}[]`;
  if (body[bracketField]) {
    return Array.isArray(body[bracketField]) ? body[bracketField] : [body[bracketField]];
  }
  if (body[fieldName]) {
    return Array.isArray(body[fieldName]) ? body[fieldName] : [body[fieldName]];
  }
  return [];
}

// ─── POST add new painting (Multiple Images Supported) ────────────
router.post('/', upload.any(), async (req, res) => {
  try {
    const {
      title, arabicTitle, price, originalPrice, category, artMovement,
      description, dimensions, materials, availability,
      featured, popular,
    } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({ success: false, message: 'Title and price are required.' });
    }

    const tags = parseTags(req.body);

    const paintingData = {
      title,
      arabicTitle: arabicTitle || '',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      category: category || 'General',
      artMovement: artMovement || '',
      description: description || '',
      dimensions: dimensions || '',
      materials: materials || '',
      availability: availability || 'In Stock',
      featured: featured === '1' || featured === true || featured === 'true',
      popular: popular === '1' || popular === true || popular === 'true',
      tags,
      images: [],
      imagesPublicIds: [],
    };

    // Collect uploaded files from Cloudinary
    const uploadedFiles = req.files || (req.file ? [req.file] : []);
    const uploadedUrls = uploadedFiles.map((f) => f.path);
    const uploadedPids = uploadedFiles.map((f) => f.filename);

    // Text URLs if passed
    const passedImages = parseArrayField(req.body, 'images');

    const allImages = [...uploadedUrls, ...passedImages];

    if (allImages.length > 0) {
      paintingData.image = allImages[0];
      paintingData.images = allImages;
    } else if (req.body.image) {
      paintingData.image = req.body.image;
      paintingData.images = [req.body.image];
    }

    if (uploadedPids.length > 0) {
      paintingData.imagePublicId = uploadedPids[0];
      paintingData.imagesPublicIds = uploadedPids;
    }

    const painting = await Painting.create(paintingData);
    res.status(201).json({ success: true, data: painting });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── Handler logic for updating painting ──────────────────────────
async function handleUpdatePainting(req, res) {
  try {
    const existing = await Painting.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Painting not found.' });
    }

    const {
      title, arabicTitle, price, originalPrice, category, artMovement,
      description, dimensions, materials, availability,
      featured, popular,
    } = req.body;

    const tags = req.body['tags[]'] || req.body.tags ? parseTags(req.body) : existing.tags;

    const updateData = {
      title: title || existing.title,
      arabicTitle: arabicTitle !== undefined ? arabicTitle : existing.arabicTitle,
      price: price !== undefined ? Number(price) : existing.price,
      originalPrice: originalPrice ? Number(originalPrice) : existing.originalPrice,
      category: category || existing.category,
      artMovement: artMovement !== undefined ? artMovement : existing.artMovement,
      description: description !== undefined ? description : existing.description,
      dimensions: dimensions !== undefined ? dimensions : existing.dimensions,
      materials: materials !== undefined ? materials : existing.materials,
      availability: availability || existing.availability,
      featured: featured !== undefined ? (featured === '1' || featured === true || featured === 'true') : existing.featured,
      popular: popular !== undefined ? (popular === '1' || popular === true || popular === 'true') : existing.popular,
      tags,
    };

    // Check newly uploaded files
    const uploadedFiles = req.files || (req.file ? [req.file] : []);
    const uploadedUrls = uploadedFiles.map((f) => f.path);
    const uploadedPids = uploadedFiles.map((f) => f.filename);

    // Existing images kept by admin
    const keptExistingImages = parseArrayField(req.body, 'existingImages');

    if (uploadedUrls.length > 0 || keptExistingImages.length > 0) {
      const mergedImages = [...keptExistingImages, ...uploadedUrls];
      updateData.images = mergedImages;
      updateData.image = mergedImages[0] || '';

      const mergedPids = [...(existing.imagesPublicIds || []), ...uploadedPids];
      updateData.imagesPublicIds = mergedPids;
      updateData.imagePublicId = mergedPids[0] || '';
    }

    const painting = await Painting.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: painting });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// ─── PUT update painting ──────────────────────────────────────────
router.put('/:id', upload.any(), handleUpdatePainting);

// ─── POST (alias for PUT) ─────────────────────────────────────────
router.post('/:id', upload.any(), handleUpdatePainting);

// ─── DELETE painting ──────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id);
    if (!painting)
      return res.status(404).json({ success: false, message: 'Painting not found.' });

    // Delete all images from Cloudinary
    if (painting.imagesPublicIds && painting.imagesPublicIds.length > 0) {
      for (const pid of painting.imagesPublicIds) {
        try {
          await cloudinary.uploader.destroy(pid);
        } catch {
          // ignore error
        }
      }
    } else if (painting.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(painting.imagePublicId);
      } catch {
        // ignore error
      }
    }

    await Painting.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Painting deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── Multer error handler ─────────────────────────────────────────
router.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ success: false, message: 'Image size must be under 10 MB.' });
  }
  res.status(400).json({ success: false, message: err.message });
});

export default router;
