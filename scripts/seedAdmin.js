import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

dotenv.config();

const ADMIN_EMAIL = 'amircreator09@gmail.com';
const ADMIN_PASSWORD = 'amir112233';
const ADMIN_NAME = 'Amir Admin';

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.Database);
    console.log('Database connected');

    // Delete any existing admin
    await Admin.deleteMany({});
    console.log('Old admin(s) removed');

    await Admin.create({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      name: ADMIN_NAME,
    });

    console.log('✅ Admin created successfully!');
    console.log('   Email   :', ADMIN_EMAIL);
    console.log('   Password:', ADMIN_PASSWORD);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding admin:', err.message);
    process.exit(1);
  }
}

seedAdmin();
