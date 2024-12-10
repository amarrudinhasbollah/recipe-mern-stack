// Entrypoint for API
import express from 'express';
import dotenv from 'dotenv';
import { connectRecipeDB } from './config/db.js';

import recipeRoutes from "./routes/recipe.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Allows to accept JSON data in req.body

app.use("/api/recipes", recipeRoutes);

app.listen(PORT, () => {
    connectRecipeDB();
    console.log("Server started at http://localhost:" + PORT);
})