import express from 'express';
import { sendOrderNotification } from '../config/mailer.js';

const router = express.Router();

// POST /api/orders/notify — Send email notification to admin
router.post('/notify', async (req, res) => {
  try {
    const { customer, email, phone, address, city, country, total, items, paymentMethod, orderRef } = req.body;

    if (!customer || !items || !total) {
      return res.status(400).json({ success: false, message: 'Missing required order fields.' });
    }

    await sendOrderNotification({ customer, email, phone, address, city, country, total, items, paymentMethod, orderRef });

    res.json({ success: true, message: 'Order notification sent.' });
  } catch (err) {
    console.error('Email notification failed:', err.message);
    // Don't block the order — just log the error
    res.status(500).json({ success: false, message: 'Email failed: ' + err.message });
  }
});

export default router;
