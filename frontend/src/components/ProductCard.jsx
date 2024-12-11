import React, { useState } from 'react'
import { BsTrash3Fill, BsPencilSquare } from "react-icons/bs";
import '../stylesheets/ProductCard.css';
import { useRecipeStore } from '../store/recipe';

const ProductCard = ({ recipe }) => {
    const [successToast, setSuccessToast] = useState({ show: false, message: '' }); // Singular success toast
    const [updatedRecipe, setUpdatedRecipe] = useState(recipe);

    // Handling interaction using global store
    const { deleteRecipe, updateRecipe } = useRecipeStore();

    const handleDeleteRecipe = async (rid) => {
        const { success, message } = await deleteRecipe(rid);
        console.log("Before updating state:", successToast); // Log current state
        if (!success) {
            setSuccessToast({ show: true, message: message || 'Failed to delete recipe.' });
        } else {
            setSuccessToast({ show: true, message: message || 'Recipe deleted successfully!' });
        }
        console.log("After updating state:", successToast); // Log state after update
        setTimeout(() => setSuccessToast({ show: false, message: '' }), 3000);
    }

    const handleUpdateRecipe = async (rid, updatedRecipe) => {
        const { success, message } = updateRecipe(rid, updatedRecipe);
        setSuccessToast({ show: success, message: "Product updated successfully." });
        setTimeout(() => setSuccessToast({ show: false, message: '' }), 3000);
    }

    return (
        <>
            {/* Singular Toast for Success */}
            {successToast.show && (
                <div className="toast-container toast-style">
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header bg-success text-white">
                            <strong className="me-auto">Notification</strong>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setSuccessToast({ show: false, message: '' })}
                            ></button>
                        </div>
                        <div className="toast-body">{successToast.message}</div>
                    </div>
                </div>
            )}

            <div className="card card-hover">
                <div className="card-body">
                    <img className="recipe-photo" src={recipe.photo} alt={recipe.title} object-fit="cover" />
                    <h5 className="recipe-title">{recipe.title}</h5>
                    <p className="recipe-text">{recipe.steps}</p>
                    <button
                        className="edit-button btn btn-secondary"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target={`#exampleModal-${recipe._id}`}
                    >
                        <BsPencilSquare />
                    </button>
                    <button className="delete-button btn btn-danger" type="button" onClick={() => handleDeleteRecipe(recipe._id)}><BsTrash3Fill /></button>
                </div>
            </div>

            {/* Modal (pop-up) for editing recipes */}
            <div className="modal fade" id={`exampleModal-${recipe._id}`} tabindex="-1" aria-labelledby={`exampleModalLabel-${recipe._id}`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`exampleModalLabel-${recipe._id}`}>Edit Recipe</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label for="title">Title</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={updatedRecipe.title}
                                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, title: e.target.value })}
                                ></input>
                            </div>

                            <div className="form-group">
                                <label for="steps">Cooking Steps</label>
                                <textarea
                                    type="text"
                                    class="form-control"
                                    value={updatedRecipe.steps}
                                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, steps: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label for="title">Photo</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    value={updatedRecipe.photo}
                                    onChange={(e) => setUpdatedRecipe({ ...updatedRecipe, photo: e.target.value })}
                                ></input>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => handleUpdateRecipe(recipe._id, updatedRecipe)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard