import React, { useState } from 'react'
import '../stylesheets/CreatePage.css'
import { useRecipeStore } from '../store/recipe';

const CreatePage = () => {
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    steps: "",
    photo: "",
  });

  // For showing notification pop-up
  const [successToast, setSuccessToast] = useState({ show: false, message: '' }); // Singular success toast
  const [toasts, setToasts] = useState([]);

  const { createRecipe } = useRecipeStore()

  const handleAddRecipe = async () => {
    const { success, message } = await createRecipe(newRecipe);
    if (!success) {
      const newToast = { id: Date.now(), message };
      setToasts((prevToasts) => [...prevToasts, newToast]);
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
      }, 3000);
    } else {
      console.log("Data sent to MongoDB: ")
      setSuccessToast({ show: true, message });
      setTimeout(() => setSuccessToast({ show: false, message: '' }), 3000);
    }
  }

  return (
    <div class="container">
      <h1> Write a Recipe </h1>

      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          placeholder="Title of Recipe"
          value={newRecipe.title}
          onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
        ></input>
      </div>

      <div class="form-group">
        <label for="steps">Cooking Steps</label>
        <textarea
          type="text"
          class="form-control"
          placeholder="Cooking Steps"
          value={newRecipe.steps}
          onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })}
        ></textarea>
      </div>

      <div class="form-group">
        <label for="title">Photo</label>
        <input
          type="text"
          class="form-control"
          placeholder="Photo URL"
          value={newRecipe.photo}
          onChange={(e) => setNewRecipe({ ...newRecipe, photo: e.target.value })}
        ></input>
      </div>

      <button type="submit" class="btn btn-primary" onClick={handleAddRecipe}>
        Finish Writing
      </button>

      {/* Toast Container for Error Toasts */}
      <div className="toast-container toast-style">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header bg-danger text-white">
              <strong className="me-auto">Error</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() =>
                  setToasts(toasts.filter((t) => t.id !== toast.id)) // Remove specific toast
                }
              ></button>
            </div>
            <div className="toast-body">{toast.message}</div>
          </div>
        ))}
      </div>

      {/* Singular Toast for Success */}
      {successToast.show && (
        <div className="toast-container toast-style">
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header bg-success text-white">
              <strong className="me-auto">Success</strong>
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

    </div>
  )
};

export default CreatePage