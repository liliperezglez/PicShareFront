import { useContext } from 'react';
import Comments from './Comments';
import CommentForm from './CommentForm';
import UserDescription from './UserDescription';
import LikeButton from './LikeButton';
import { AuthContext } from '../context/AuthContext';

function Modal({ photo, closeModal, addComment, editComment, toggleLike, removeComment, tokenCaducadoVisible, setTokenCaducadoVisible }) {
  const { token } = useContext(AuthContext);

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
          <Comments
            photo={photo}
            removeComment={removeComment}
            editComment={editComment}
            setTokenCaducadoVisible={setTokenCaducadoVisible}
            tokenCaducadoVisible={tokenCaducadoVisible}
          />
          {token && (
            <div className='like-and-comment'>
              <LikeButton photo={photo} toggleLike={toggleLike} tokenCaducadoVisible={tokenCaducadoVisible} />

              <label className='comment-button' htmlFor='comment'>
                <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' fill='currentColor' className='bi bi-chat-dots-fill' viewBox='0 0 16 16'>
                  <path d='M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' />
                </svg>
              </label>
            </div>
          )}
          <CommentForm addComment={addComment} photo={photo} tokenCaducadoVisible={tokenCaducadoVisible} />
        </div>
      </div>
      <button onClick={closeModal}>
        <svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='currentColor' className='bi bi-x-lg' viewBox='0 0 16 16'>
          <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
        </svg>
      </button>
    </div>
  );
}

export default Modal;
