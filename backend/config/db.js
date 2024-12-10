import mongoose from "mongoose";

export const connectRecipeDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.messsage}`);
        process.exit(1); // Exit codes: 1 for failure || 0 for success
    }
}