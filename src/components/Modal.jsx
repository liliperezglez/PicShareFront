import React, { useState } from "react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import UserDescription from "./UserDescription";

function Modal({ photo, closeModal, addComment }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <img
          style={{ width: "400px" }}
          src={`${import.meta.env.VITE_APP_BACKEND.replace(
            /\/+$/,
            ""
          )}/uploads/photos/${photo.idUser}/${photo.photo}`}
          alt={photo.description}
        />
        <div>
          <UserDescription user={photo} />
        </div>

        <Comments photo={photo} />
        <CommentForm addComment={addComment} id={photo.idEntry} />
        <button onClick={closeModal}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;
