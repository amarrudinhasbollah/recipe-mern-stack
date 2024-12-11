import React, { useEffect } from 'react';
import { useRecipeStore } from '../store/recipe';
import ProductCard from '../components/ProductCard';
import Modal from '../components/Modal';

const HomePage = () => {
  const { fetchRecipes, recipes } = useRecipeStore();

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);
  console.log("Recipes: ", recipes);

  return (
    <div className="container">
      <h1>Our Selected Recipes</h1>

      <div className="container">
        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4">
              <ProductCard key={recipe._id} recipe={recipe} />
            </div>
          ))}
        </div>
      </div>

      {recipes.length === 0 && (
        <p>No Recipes Written 😢{" "}
          <a href="/create">Write a Recipe Now</a>
        </p>
      )}
    </div>
  )
}

export default HomePage