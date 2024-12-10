import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            default: "Anonymous"
        },
        title: {
            type: String,
            required: true,
        },
        steps: {
            type: String,
            required: true
        },
        photo: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;