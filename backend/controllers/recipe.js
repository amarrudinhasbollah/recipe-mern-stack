import mongoose from "mongoose";
import Recipe from "../models/recipe.js";

export const getRecipes = async(req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.status(200).json({ success: true, data: recipes })
    } catch (error) {
        console.log("Error in fetching recipes: ", error.message);
        res.status(500).json({ success: false, message: "Server Error"})
    }
}

export const createRecipe = async (req, res) => {
    const recipe = req.body; // User will send this data

    if (!recipe.title || !recipe.steps || !recipe.photo) {
        return res.status(400).json({ success: false, message: "Please fill in all the fields" });
    }

    const newRecipe = new Recipe(recipe);

    try {
        await newRecipe.save();
        res.status(201).json({ status: true, data: newRecipe });
    } catch (error) {
        console.error("Error when writing recipe: ", error.message);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const updateRecipe = async (req, res) => {
    const {id} = req.params;

    const recipe = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Recipe ID" })
    }

    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, {new: true});
        res.status(200).json({ success: true, data: updatedRecipe });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });

    }
}

export const deleteRecipe = async (req, res) => {
    const {id} = req.params;
    console.log("id: ", id);

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Recipe ID" })
    }

    try {
        await Recipe.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Recipe deleted" });
    } catch (error) {
        console.log("Error in deleting recipes: ", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

