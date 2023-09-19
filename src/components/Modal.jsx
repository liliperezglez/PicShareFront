import React, { useState } from 'react';
import Comments from './Comments';
import CommentForm from './CommentForm';
import UserDescription from './UserDescription';
import LikeButton from './LikeButton';

function Modal({ photo, closeModal, addComment, editComment,  toggleLike ,removeComment }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };

  return (
    <div className='modal-overlay' onClick={handleOverlayClick}>
      <div className='modal-content'>
        <img
          style={{ width: '400px' }}
          src={`${import.meta.env.VITE_APP_BACKEND.replace(/\/+$/, '')}/uploads/photos/${photo.idUser}/${photo.photo}`}
          alt={photo.description}
        />
        <div>
        <LikeButton photo={photo} toggleLike={toggleLike}/>
          <UserDescription user={photo} />
        </div>
        <Comments photo={photo} removeComment={removeComment} editComment={editComment} />
        <CommentForm addComment={addComment} photo={photo} />
        <button onClick={closeModal}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;
