import mongoose from 'mongoose';

const paintingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    arabicTitle: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: Number, required: [true, 'Price is required'], min: 0 },
    originalPrice: { type: Number, default: null },
    image: { type: String, default: '' },
    imagePublicId: { type: String, default: '' }, // Cloudinary public_id for deletion
    category: { type: String, default: 'General' },
    dimensions: { type: String, default: '' },
    materials: { type: String, default: '' },
    availability: {
      type: String,
      enum: ['In Stock', 'Out of Stock', 'Made to Order'],
      default: 'In Stock',
    },
    stock: { type: Number, default: 1, min: 0 },
    featured: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Painting = mongoose.model('Painting', paintingSchema);
export default Painting;
