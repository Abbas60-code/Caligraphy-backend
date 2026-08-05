import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.Cloudinaryname,
  api_key: process.env.Cloudinarykey,
  api_secret: process.env.Cloudinarysecret,
});

cloudinary.uploader.upload('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==', { folder: 'amir-calligraphy' })
  .then(res => {
    console.log('Upload success:', res.secure_url);
    process.exit(0);
  })
  .catch(err => {
    console.error('Upload failed:', err);
    process.exit(1);
  });
