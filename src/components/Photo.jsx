import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import UserInfo from './UserInfo';
import Modal from './Modal';
import DeletePost from './DeletePost';
import UserDescription from './UserDescription';
import LikeButton from './LikeButton';

import { formatDate } from '../services/helpers/helpers';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function Photo({ photo, removePost, addComment, editComment, removeComment, toggleLike, tokenCaducadoVisible, setTokenCaducadoVisible }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useContext(AuthContext);

  const { idUser } = useParams();
  const { isLightMode } = useTheme();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <article className='photo'>
      <div className='user-post-info'>{!idUser && <UserInfo user={photo} />}</div>
      <div className='photo-details'>
        <div className='photo-date-place'>
          <p className='photo-date'>
            <svg xmlns='http://www.w3.org/2000/svg' width='12' height='9' fill='currentColor' className='bi bi-clock-fill' viewBox='0 0 16 16'>
              <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z' />
            </svg>{' '}
            {formatDate(photo.date)}
          </p>

          {photo.place && (
            <p className='photo-place'>
              <svg xmlns='http://www.w3.org/2000/svg' width='12' height='9' fill='currentColor' className='bi bi-geo-alt-fill' viewBox='0 0 16 16'>
                <path d='M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' />
              </svg>{' '}
              {photo.place}
            </p>
          )}
        </div>

        <div>
          <img
            className='user-photo profile-posts'
            onClick={openModal}
            src={`${import.meta.env.VITE_APP_BACKEND.replace(/\/+$/, '')}/uploads/photos/${photo.idUser}/${photo.photo}`}
            alt={photo.description}
          />
          <DeletePost photo={photo} removePost={removePost} tokenCaducadoVisible={tokenCaducadoVisible} setTokenCaducadoVisible={setTokenCaducadoVisible} />
        </div>
        {isModalOpen && (
          <Modal
            tokenCaducadoVisible={tokenCaducadoVisible}
            setTokenCaducadoVisible={setTokenCaducadoVisible}
            photo={photo}
            addComment={addComment}
            editComment={editComment}
            closeModal={closeModal}
            removeComment={removeComment}
            toggleLike={toggleLike}
          />
        )}
      </div>
      {!idUser && token && (
        <div className='like-and-comment-buttons'>
          <LikeButton toggleLike={toggleLike} photo={photo} tokenCaducadoVisible={tokenCaducadoVisible} />
          <button className='comment-button' onClick={openModal}>
            {isLightMode ? (
              <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' fill='currentColor' class='bi bi-chat-dots' viewBox='0 0 16 16'>
                <path d='M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' />
                <path d='m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z' />
              </svg>
            ) : (
              <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' fill='currentColor' className='bi bi-chat-dots-fill' viewBox='0 0 16 16'>
                <path d='M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' />
              </svg>
            )}
          </button>
        </div>
      )}
      {!idUser && <UserDescription user={photo} />}
    </article>
  );
}

export default Photo;
