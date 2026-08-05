import mongoose from 'mongoose';

let cachedConnection = null;

const connectDB = async () => {
    if (cachedConnection) {
        return cachedConnection;
    }

    try {
        // Options to ensure stable connection
        const conn = await mongoose.connect(process.env.Database, {
            serverSelectionTimeoutMS: 5000, // Timeout fast if Atlas is unreachable
        });
        cachedConnection = conn;
        console.log(`Database connected successfully`);
        return conn;
    } catch (error) {
        console.error(`Error connecting to database: ${error.message}`);
        throw error;
    }
};

export default connectDB;
