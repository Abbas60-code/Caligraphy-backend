import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Painting from '../models/Painting.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

export const userArtworks = [
  {
    title: "Allah – The Divine Name",
    arabicTitle: "الله جل جلاله",
    price: 260,
    originalPrice: 320,
    category: "calligraphy",
    artMovement: "Calligraphy",
    image: "/calligraphy_allah.png",
    description: "A breathtaking rendering of the Divine Name in classical Thuluth script, hand-painted with genuine 24-karat gold leaf on archival black canvas. Each curve carries meditative mastery.",
    dimensions: "60 × 80 cm",
    materials: "Archival black canvas, 24K gold leaf, natural walnut ink",
    availability: "In Stock",
    featured: true,
    popular: true,
    tags: ["calligraphy", "allah", "gold", "thuluth", "spiritual"],
  },
  {
    title: "Ayatul Kursi – The Throne Verse",
    arabicTitle: "آية الكرسي",
    price: 320,
    originalPrice: 390,
    category: "calligraphy",
    artMovement: "Calligraphy",
    image: "/calligraphy_ayatul_kursi.png",
    description: "The majestic Throne Verse (Al-Baqarah 2:255) sculpted in sweeping Diwani script against a rich burgundy background with 24K gold accents. A timeless testament of divine sovereignty and spiritual serenity.",
    dimensions: "80 × 60 cm",
    materials: "Hand-stretched linen canvas, mineral pigments, 24K gold leaf, solid walnut frame",
    availability: "In Stock",
    featured: true,
    popular: true,
    tags: ["calligraphy", "ayatul kursi", "quran", "gold leaf", "diwani"],
  },
  {
    title: "Bismillah – Sacred Serenity",
    arabicTitle: "بسم الله الرحمن الرحيم",
    price: 240,
    originalPrice: 290,
    category: "calligraphy",
    artMovement: "Calligraphy",
    image: "/calligraphy_bismillah.png",
    description: "The sacred Bismillah in flowing classical Naskh composition upon aged antique parchment texture. Radiates warmth and peace for home or executive office.",
    dimensions: "50 × 70 cm",
    materials: "Premium parchment board, handmade oak gall ink, gold powder",
    availability: "In Stock",
    featured: true,
    popular: true,
    tags: ["calligraphy", "bismillah", "naskh", "parchment"],
  },
  {
    title: "Modern Diwani Composition",
    arabicTitle: "الخط المعاصر",
    price: 280,
    originalPrice: 340,
    category: "modern-fusion",
    artMovement: "Modern Fusion",
    image: "/calligraphy_modern.png",
    description: "A contemporary artistic fusion of traditional Arabic script and modern color fields. Painted with expressive gestural energy and subtle gold foil.",
    dimensions: "70 × 100 cm",
    materials: "Archival linen, acrylic polymers, gold leaf, charcoal",
    availability: "In Stock",
    featured: false,
    popular: true,
    tags: ["fusion", "modern", "diwani", "contemporary"],
  },
  {
    title: "Pastoral Solitude & Valley Light",
    arabicTitle: "سكينة الوادي",
    price: 360,
    originalPrice: 440,
    category: "abstract",
    artMovement: "Fine Art",
    image: "/art/0aa0188c3716703e0c1769ae8084b481.jpg",
    description: "A rich atmospheric oil painting capturing the tranquility of rural pastoral life under golden afternoon light. Heavy foliage textures and tranquil natural serenity.",
    dimensions: "85 × 110 cm",
    materials: "Museum linen canvas, oil on canvas, damar protective glaze",
    availability: "In Stock",
    featured: true,
    popular: true,
    tags: ["landscape", "pastoral", "fine art", "oil painting"],
  },
  {
    title: "The Royal Vessel & Maritime Horizons",
    arabicTitle: "السفينة الملكية",
    price: 420,
    originalPrice: 500,
    category: "miniature",
    artMovement: "Miniature",
    image: "/art/46d9829041783dcd9374ace83f7957a6.jpg",
    description: "A historical maritime masterpiece depicting majestic vessels on calm waters amid billowing smoke and soft atmospheric fog. Painted with delicate heritage realism.",
    dimensions: "80 × 100 cm",
    materials: "Fine-grain canvas, artist-grade oil pigments, custom hand-carved frame",
    availability: "In Stock",
    featured: true,
    popular: true,
    tags: ["maritime", "heritage", "vessel", "classic"],
  },
  {
    title: "Symphony in Oil & Amber Light",
    arabicTitle: "سيمفونية العنبر",
    price: 310,
    originalPrice: 380,
    category: "abstract",
    artMovement: "Abstract",
    image: "/art/0d46b64eeeb730ae9051b8b5afd24924.jpg",
    description: "Luminous amber tones and layered textural glazes interact organically across primed canvas. A centerpiece that commands visual warmth and aesthetic contemplation.",
    dimensions: "75 × 100 cm",
    materials: "Archival gallery-wrapped canvas, heavy oil impasto, satin varnish",
    availability: "In Stock",
    featured: true,
    popular: false,
    tags: ["abstract", "amber", "texture", "contemporary"],
  },
  {
    title: "Geometric Rhythms & Form",
    arabicTitle: "إيقاع هندسي",
    price: 340,
    originalPrice: 410,
    category: "cubism",
    artMovement: "Cubism",
    image: "/art/2_A.jpg",
    description: "An analytical study of structural planes and spatial deconstruction. Multifaceted angles and rhythmic chiaroscuro bring avant-garde modernism into luxury interiors.",
    dimensions: "70 × 90 cm",
    materials: "Stretched linen canvas, acrylic polymer, graphite, matte varnish",
    availability: "In Stock",
    featured: false,
    popular: true,
    tags: ["cubism", "geometry", "planes", "modernist"],
  },
  {
    title: "Equestrian Cadence & Motion",
    arabicTitle: "حركة الفروسية",
    price: 380,
    originalPrice: 460,
    category: "cubism",
    artMovement: "Cubism",
    image: "/art/2de1289a41c9897deddc6a0e82ddfb5a.jpg",
    description: "Dynamic kinetic brushstrokes and fractured planes capture the raw power, elegance, and velocity of equine movement. Inspired by modernist Pakistani masterworks.",
    dimensions: "80 × 105 cm",
    materials: "Belgian linen, artist-grade oils, heavy palette knife impasto",
    availability: "In Stock",
    featured: true,
    popular: true,
    tags: ["equestrian", "motion", "cubism", "expressive"],
  },
  {
    title: "The Court of Illuminated Heritage",
    arabicTitle: "مجلس التراث",
    price: 450,
    originalPrice: 540,
    category: "miniature",
    artMovement: "Miniature",
    image: "/art/4b283e3e87631b9887cd07b0525bac2e.jpg",
    description: "A classical celebration of royal court aesthetics, intricate architectural arches, and fine ornate detailing executed with traditional discipline.",
    dimensions: "60 × 85 cm",
    materials: "Treated wasli parchment, mineral pigments, 24K gold powder, teak frame",
    availability: "In Stock",
    featured: true,
    popular: true,
    tags: ["miniature", "court", "heritage", "illuminated"],
  },
  {
    title: "Mystic Radiance in Crimson & Gold",
    arabicTitle: "إشراق صوفي",
    price: 350,
    originalPrice: 430,
    category: "modern-fusion",
    artMovement: "Modern Fusion",
    image: "/art/53c237adaaa8c1d584e5e5e5ee598224.jpg",
    description: "Deep burgundy grounds illuminated with gold leaf accents and spiritual fluidity. Blending traditional eastern warmth with contemporary visual scale.",
    dimensions: "75 × 95 cm",
    materials: "Archival canvas, mixed media, 22K gold dust, resin coat",
    availability: "In Stock",
    featured: false,
    popular: false,
    tags: ["fusion", "crimson", "gold", "spiritual"],
  },
];

async function seedPaintings() {
  try {
    if (!process.env.Database) {
      console.log('⚠️ No Database connection string in .env');
      return;
    }
    await mongoose.connect(process.env.Database);
    console.log('Database connected');

    // Clear old paintings and seed the user's public images
    await Painting.deleteMany({});
    console.log('Cleared old paintings from DB');

    const result = await Painting.insertMany(userArtworks);
    console.log(`✅ Successfully seeded ${result.length} user artworks from public folder into database!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding paintings:', err.message);
    process.exit(1);
  }
}

seedPaintings();
