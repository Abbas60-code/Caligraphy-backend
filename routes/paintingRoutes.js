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

// ─── POST add new painting ────────────────────────────────────────
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      title, arabicTitle, price, originalPrice, category,
      description, dimensions, materials, availability,
      featured, popular,
    } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({ success: false, message: 'Title and price are required.' });
    }

    // Parse tags (sent as tags[] from FormData)
    const tags = req.body['tags[]']
      ? Array.isArray(req.body['tags[]']) ? req.body['tags[]'] : [req.body['tags[]']]
      : [];

    const paintingData = {
      title,
      arabicTitle: arabicTitle || '',
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : null,
      category: category || 'General',
      description: description || '',
      dimensions: dimensions || '',
      materials: materials || '',
      availability: availability || 'In Stock',
      featured: featured === '1' || featured === true,
      popular: popular === '1' || popular === true,
      tags,
    };

    // If image uploaded to Cloudinary
    if (req.file) {
      paintingData.image = req.file.path;          // secure_url
      paintingData.imagePublicId = req.file.filename; // public_id
    }

    const painting = await Painting.create(paintingData);
    res.status(201).json({ success: true, data: painting });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── PUT update painting ──────────────────────────────────────────
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const existing = await Painting.findById(req.params.id);
    if (!existing)
      return res.status(404).json({ success: false, message: 'Painting not found.' });

    const {
      title, arabicTitle, price, originalPrice, category,
      description, dimensions, materials, availability,
      featured, popular,
    } = req.body;

    const tags = req.body['tags[]']
      ? Array.isArray(req.body['tags[]']) ? req.body['tags[]'] : [req.body['tags[]']]
      : existing.tags;

    const updateData = {
      title: title || existing.title,
      arabicTitle: arabicTitle !== undefined ? arabicTitle : existing.arabicTitle,
      price: price !== undefined ? Number(price) : existing.price,
      originalPrice: originalPrice ? Number(originalPrice) : existing.originalPrice,
      category: category || existing.category,
      description: description !== undefined ? description : existing.description,
      dimensions: dimensions !== undefined ? dimensions : existing.dimensions,
      materials: materials !== undefined ? materials : existing.materials,
      availability: availability || existing.availability,
      featured: featured !== undefined ? (featured === '1' || featured === true) : existing.featured,
      popular: popular !== undefined ? (popular === '1' || popular === true) : existing.popular,
      tags,
    };

    // If new image uploaded — delete old one from Cloudinary first
    if (req.file) {
      if (existing.imagePublicId) {
        await cloudinary.uploader.destroy(existing.imagePublicId);
      }
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const painting = await Painting.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: painting });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── POST (alias for PUT) — supports FormData _method workaround ──
router.post('/:id', upload.single('image'), async (req, res) => {
  // Forward to PUT handler logic
  req.method = 'PUT';
  try {
    const existing = await Painting.findById(req.params.id);
    if (!existing)
      return res.status(404).json({ success: false, message: 'Painting not found.' });

    const {
      title, arabicTitle, price, originalPrice, category,
      description, dimensions, materials, availability,
      featured, popular,
    } = req.body;

    const tags = req.body['tags[]']
      ? Array.isArray(req.body['tags[]']) ? req.body['tags[]'] : [req.body['tags[]']]
      : existing.tags;

    const updateData = {
      title: title || existing.title,
      arabicTitle: arabicTitle !== undefined ? arabicTitle : existing.arabicTitle,
      price: price !== undefined ? Number(price) : existing.price,
      originalPrice: originalPrice ? Number(originalPrice) : existing.originalPrice,
      category: category || existing.category,
      description: description !== undefined ? description : existing.description,
      dimensions: dimensions !== undefined ? dimensions : existing.dimensions,
      materials: materials !== undefined ? materials : existing.materials,
      availability: availability || existing.availability,
      featured: featured !== undefined ? (featured === '1' || featured === true) : existing.featured,
      popular: popular !== undefined ? (popular === '1' || popular === true) : existing.popular,
      tags,
    };

    if (req.file) {
      if (existing.imagePublicId) {
        await cloudinary.uploader.destroy(existing.imagePublicId);
      }
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const painting = await Painting.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, data: painting });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── DELETE painting ──────────────────────────────────────────────
router.delete('/:id', async (req, res) => {
  try {
    const painting = await Painting.findById(req.params.id);
    if (!painting)
      return res.status(404).json({ success: false, message: 'Painting not found.' });

    // Delete image from Cloudinary
    if (painting.imagePublicId) {
      await cloudinary.uploader.destroy(painting.imagePublicId);
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
