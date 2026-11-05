import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Painting from '../models/Painting.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const multiArtPaintings = [
  // Abstract
  {
    title: "Celestial Resonance",
    arabicTitle: "رنين سماوي",
    price: 340,
    originalPrice: 420,
    category: "abstract",
    image: "/art/abstract_1.jpg",
    description: "A monumental abstract expressionist canvas exploring cosmic harmony and kinetic energy. Heavy impasto technique with ultramarine and burnt sienna.",
    dimensions: "90 × 120 cm",
    materials: "Belgian linen, textured acrylic impasto, copper leaf",
    availability: "In Stock",
    featured: true,
    popular: true,
    tags: ["abstract", "expressionism", "contemporary", "texture"],
  },
  {
    title: "Echoes of the Indus",
    arabicTitle: "أصداء الوادي",
    price: 280,
    originalPrice: 350,
    category: "abstract",
    image: "/art/abstract_2.jpg",
    description: "An evocative tribute to ancient river valleys and earthy textures. Terracotta washes, charred umber, and ochre pigment.",
    dimensions: "75 × 100 cm",
    materials: "Stretched cotton canvas, raw pigments, sand texture",
    availability: "In Stock",
    featured: false,
    popular: true,
    tags: ["abstract", "earth tones", "terracotta"],
  },
  {
    title: "Monolith in Crimson",
    arabicTitle: "النقاء القرمزي",
    price: 310,
    category: "abstract",
    image: "/art/abstract_3.jpg",
    description: "A powerful color-field study dominated by rich cadmium red and deep burgundy with glimpses of underpainted gold leaf.",
    dimensions: "80 × 100 cm",
    materials: "Archival gallery-wrapped canvas, oil & acrylic, 22K gold dust",
    availability: "In Stock",
    featured: true,
    popular: false,
    tags: ["abstract", "color field", "crimson"],
  },
  {
    title: "Urban Cadence & Solitude",
    arabicTitle: "إيقاع المدينة",
    price: 260,
    originalPrice: 320,
    category: "abstract",
    image: "/art/abstract_4.jpg",
    description: "Inspired by the architectural rhythms and nocturnal pulse of metropolitan life. Dynamic vertical strokes and raw scraping.",
    dimensions: "70 × 90 cm",
    materials: "Museum linen canvas, mixed media, graphite",
    availability: "In Stock",
    featured: false,
    popular: false,
    tags: ["abstract", "urban", "modern"],
  },
  // Cubism
  {
    title: "The Cellist in Fractured Light",
    arabicTitle: "عازف التشيلو",
    price: 390,
    originalPrice: 480,
    category: "cubism",
    image: "/art/cubism_1.jpg",
    description: "An analytical cubist masterpiece deconstructing the posture and sonic vibration of musical performance into interlocking planes.",
    dimensions: "85 × 110 cm",
    materials: "Fine-grain canvas, artist-grade oil pigments, damar glaze",
    availability: "In Stock",
    featured: true,
    popular: true,
    tags: ["cubism", "geometry", "music", "modernist"],
  },
  {
    title: "Geometric Still Life with Mandolin",
    arabicTitle: "طبيعة صامتة هندسية",
    price: 320,
    originalPrice: 390,
    category: "cubism",
    image: "/art/cubism_2.jpg",
    description: "Synthetic cubism composition incorporating collage textures, angular shadows, and warm Mediterranean tones.",
    dimensions: "70 × 90 cm",
    materials: "Stretched linen, oil and gouache, textured fiber papers",
    availability: "In Stock",
    featured: false,
    popular: true,
    tags: ["cubism", "still life", "geometric"],
  },
  {
    title: "Architectural Perspectives III",
    arabicTitle: "آفاق معمارية",
    price: 295,
    category: "cubism",
    image: "/art/cubism_3.jpg",
    description: "Sharp architectural silhouettes and faceted shadows intersect in a study of spatial ambiguity.",
    dimensions: "60 × 80 cm",
    materials: "Archival board mounted on solid pine, acrylic polymer",
    availability: "In Stock",
    featured: false,
    popular: false,
    tags: ["cubism", "architecture", "angular"],
  },
  // Miniature
  {
    title: "The Royal Falcon & Golden Foliage",
    arabicTitle: "الصقر الملكي في الرياض الذهبية",
    price: 450,
    originalPrice: 550,
    category: "miniature",
    image: "/art/miniature_1.jpg",
    description: "Executed with single-hair squirrel brushes in the traditional court miniature style. Natural stone pigments and 24K shell gold on wasli paper.",
    dimensions: "35 × 50 cm",
    materials: "Traditional handmade Wasli paper, natural stone pigments, 24K shell gold",
    availability: "In Stock",
    featured: true,
    popular: true,
    tags: ["miniature", "mughal", "persian", "wasli paper", "gold leaf"],
  },
  {
    title: "Darbar of the Illuminated Court",
    arabicTitle: "مجلس البلاط المنير",
    price: 490,
    originalPrice: 600,
    category: "miniature",
    image: "/art/miniature_2.jpg",
    description: "A historical celebration of classical Mughal palace life. Detailed floral arabesques frame an intricate court assembly.",
    dimensions: "40 × 55 cm",
    materials: "Wasli parchment, natural gouache, 24K gold foil",
    availability: "In Stock",
    featured: false,
    popular: true,
    tags: ["miniature", "darbar", "mughal court"],
  },
  {
    title: "The Secret Garden of Nishat",
    arabicTitle: "حديقة نشاط الفردوسية",
    price: 380,
    category: "miniature",
    image: "/art/miniature_3.jpg",
    description: "Flowering almond branches, singing nightingales, and ornate water fountains rendered in Persian miniature aesthetics.",
    dimensions: "30 × 42 cm",
    materials: "Treated wasli paper, pure botanical inks, gold leaf",
    availability: "Made to Order",
    featured: false,
    popular: false,
    tags: ["miniature", "persian garden", "delicate"],
  },
  // Calligraphy
  {
    title: "Ayatul Kursi – The Throne Verse",
    arabicTitle: "آية الكرسي",
    price: 320,
    originalPrice: 390,
    category: "calligraphy",
    image: "/calligraphy_ayatul_kursi.png",
    description: "The Throne Verse sculpted in sweeping Diwani script against burgundy background with 24K gold accents.",
    dimensions: "80 × 60 cm",
    materials: "Hand-stretched linen canvas, mineral pigments, 24K gold leaf",
    availability: "In Stock",
    featured: true,
    popular: true,
    tags: ["calligraphy", "ayatul kursi", "quran", "gold leaf", "diwani"],
  },
  {
    title: "Allah – The Divine Name",
    arabicTitle: "الله جل جلاله",
    price: 240,
    originalPrice: 290,
    category: "calligraphy",
    image: "/calligraphy_allah.png",
    description: "Classical Thuluth script hand-painted with genuine 24-karat gold leaf on archival black canvas.",
    dimensions: "60 × 80 cm",
    materials: "Archival black canvas, 24K gold leaf, natural walnut ink",
    availability: "In Stock",
    featured: true,
    popular: true,
    tags: ["calligraphy", "allah", "gold", "thuluth"],
  },
  {
    title: "Bismillah – Cosmic Harmony",
    arabicTitle: "بسم الله الرحمن الرحيم",
    price: 260,
    originalPrice: 320,
    category: "calligraphy",
    image: "/calligraphy_bismillah.png",
    description: "Flowing classical Naskh composition upon aged antique parchment texture.",
    dimensions: "50 × 70 cm",
    materials: "Premium parchment board, oak gall ink, gold powder",
    availability: "In Stock",
    featured: false,
    popular: true,
    tags: ["calligraphy", "bismillah", "naskh"],
  },
  {
    title: "Surah Al-Ikhlas – Geometric Kufic",
    arabicTitle: "سورة الإخلاص",
    price: 275,
    category: "calligraphy",
    image: "/calligraphy_modern.png",
    description: "Square Kufic script with geometric precision. A fusion of Islamic heritage and modernist architecture.",
    dimensions: "60 × 60 cm",
    materials: "Square stretched canvas, oil-based inks, gilded copper border",
    availability: "In Stock",
    featured: false,
    popular: false,
    tags: ["calligraphy", "kufic", "square", "geometry"],
  },
  // Fusion
  {
    title: "Sufi Whirling in Blue Abstraction",
    arabicTitle: "وجد الدراويش",
    price: 360,
    originalPrice: 440,
    category: "modern-fusion",
    image: "/art/fusion_1.jpg",
    description: "An avant-garde exploration blending the ecstasy of Sufi whirling with contemporary abstract color fields and gestural Arabic letterforms.",
    dimensions: "90 × 90 cm",
    materials: "Heavy canvas, acrylic washes, gold leaf, charcoal",
    availability: "In Stock",
    featured: true,
    popular: true,
    tags: ["fusion", "abstract", "calligraphy", "sufi"],
  },
  {
    title: "Harmony in Amber & Modern Script",
    arabicTitle: "تناغم العنبر",
    price: 310,
    originalPrice: 380,
    category: "modern-fusion",
    image: "/art/fusion_2.jpg",
    description: "Rich amber grounds with layered calligraphic gestures deconstructed into lyrical abstract lines.",
    dimensions: "80 × 100 cm",
    materials: "Linen canvas, acrylic, oil pastels, metallic pigment",
    availability: "In Stock",
    featured: false,
    popular: false,
    tags: ["fusion", "modern", "amber"],
  },
  // Custom
  {
    title: "Bespoke Atelier Commission",
    arabicTitle: "عمل فني مخصص",
    price: 450,
    category: "custom",
    image: "/calligraphy_allah.png",
    description: "Commission an exclusive original artwork in Abstract, Cubism, Miniature, or Calligraphy tailored to your space.",
    dimensions: "Custom Scaled to Your Wall",
    materials: "Archival canvas or wasli paper, oils, acrylics, 24K gold leaf",
    availability: "Made to Order",
    featured: false,
    popular: true,
    tags: ["custom", "bespoke", "commission"],
  },
];

async function managePaintings() {
  try {
    if (!process.env.Database) {
      console.log('⚠️ No Database connection string in .env');
      return;
    }
    await mongoose.connect(process.env.Database);
    console.log('Database connected');

    if (process.argv.includes('--clear')) {
      await Painting.deleteMany({});
      console.log('✅ All paintings permanently cleared from database.');
      process.exit(0);
    }

    const count = await Painting.countDocuments();
    console.log(`Current paintings in DB: ${count}`);

    if (process.argv.includes('--force')) {
      await Painting.deleteMany({});
      await Painting.insertMany(multiArtPaintings);
      console.log(`✅ Seeded ${multiArtPaintings.length} paintings into database.`);
    }
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

managePaintings();
