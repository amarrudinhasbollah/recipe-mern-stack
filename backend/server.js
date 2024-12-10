// Entrypoint for API
import express from 'express';
import dotenv from 'dotenv';
import { connectRecipeDB } from './config/db.js';

import recipeRoutes from "./routes/recipe.js"

dotenv.config();

const app = express();

app.use(express.json()); // Allows to accept JSON data in req.body

app.use("/api/recipes", recipeRoutes);

app.listen(5000, () => {
    connectRecipeDB();
    console.log("Server started at http://localhost:5000");
})