import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import paintingRoutes from './routes/paintingRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection middleware (critical for serverless / Vercel environment)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database middleware connection error:', err.message);
    res.status(500).json({ success: false, message: 'Database connection failed: ' + err.message });
  }
});

// Routes
app.use('/api/customer', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/paintings', paintingRoutes);
app.use('/api/orders', orderRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Amir Calligraphy API is running.' });
});

// Newsletter subscription endpoint
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required.' });
  }
  res.json({ success: true, message: 'Subscribed successfully!' });
});

export default app;
