import { useContext } from 'react';
import Comments from './Comments';
import CommentForm from './CommentForm';
import UserDescription from './UserDescription';
import LikeButton from './LikeButton';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function Modal({ photo, closeModal, addComment, editComment, toggleLike, removeComment, tokenCaducadoVisible, setTokenCaducadoVisible }) {
  const { token } = useContext(AuthContext);
  const { isLightMode } = useTheme();

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
                {isLightMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">
                  <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                </svg>
                ) : (
                  <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' fill='currentColor' className='bi bi-chat-dots-fill' viewBox='0 0 16 16'>
                  <path d='M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' />
                </svg>
              )}
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
