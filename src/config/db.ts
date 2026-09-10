import mongoose from 'mongoose';

async function connectDB() {
    const mongoUri = process.env.APP_URL;
    if (!mongoUri) {
        throw new Error("APP_URL is not defined");
    }
    await mongoose.connect(mongoUri);
    console.log("Database connected successfully");
}

export default connectDB;
