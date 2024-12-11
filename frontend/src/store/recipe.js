import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
    recipes: [],
    setRecipes: (recipes) => ({ recipes }),
    createRecipe: async (newRecipe) => {
        if (!newRecipe.title || !newRecipe.steps || !newRecipe.photo) {
            return { success: false, message: "Error: Please fill in all fields" };
        }
        const res = await fetch("/api/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecipe)
        });

        const data = await res.json();
        set((state) => ({ recipes: [...state.recipes, data.data] }));
        return { success: true, message: "Recipe written succesfully." }
    },
    fetchRecipes: async () => {
        const res = await fetch("/api/recipes");
        const data = await res.json();
        set({ recipes: data.data });
    },
    deleteRecipe: async (rid) => {
        const res = await fetch(`/api/recipes/${rid}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        // Update UI without refreshing
        set((state) => ({ recipes: state.recipes.filter(recipe => recipe._id !== rid) }));
        return { success: true, message: data.message };
    },
    updateRecipe: async(rid, updatedRecipe) => {
        const res = await fetch(`/api/recipes/${rid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRecipe),
        });
        const data = await res.json();
        if (!data.success) return {success: false, message: data.message}

        // Update UI without refreshing
        set(state => ({
            recipes: state.recipes.map(recipe => recipe._id === rid ? data.data : recipe)
        }));
        return { success: true, message: data.message }
    }
}));