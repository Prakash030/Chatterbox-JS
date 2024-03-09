import mongoose, { ConnectOptions } from 'mongoose'

export const connectDB = async () => {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URL || '',); 
            console.log(`MongoDB Connected Successfully`);
        } catch (error: any) {
            console.error(error.message);
            process.exit(1);
        }
    }
