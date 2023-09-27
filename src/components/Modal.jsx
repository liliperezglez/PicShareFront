import React, { useState } from 'react';
import Comments from './Comments';
import CommentForm from './CommentForm';
import UserDescription from './UserDescription';
import LikeButton from './LikeButton';

function Modal({ photo, closeModal, addComment, editComment, toggleLike, removeComment }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  return (
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal-content'>
        <div className='modal-img'>
          <img src={`${import.meta.env.VITE_APP_BACKEND.replace(/\/+$/, '')}/uploads/photos/${photo.idUser}/${photo.photo}`} alt={photo.description} />
        </div>
        <div className='modal-data'>
          <UserDescription user={photo} />
          <Comments photo={photo} removeComment={removeComment} editComment={editComment} />
          <div className='like-and-comment'>
            <LikeButton photo={photo} toggleLike={toggleLike} />
            <label className='comment-button' htmlFor='comment'>
              💬
            </label>
          </div>
          <CommentForm addComment={addComment} photo={photo} />
        </div>
        <button onClick={closeModal}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;
