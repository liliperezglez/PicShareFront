import { useState } from 'react';
import { useParams } from 'react-router-dom';

import UserInfo from './UserInfo';
import Modal from './Modal';
import DeletePost from './DeletePost';
import UserDescription from './UserDescription';
import LikeButton from './LikeButton';

import { formatDate } from '../services/helpers/helpers';

function Photo({ photo, removePost, addComment, editComment, removeComment, toggleLike }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { idUser } = useParams();

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
        <p className='photo-date'>{formatDate(photo.date)} </p>
        <p className='photo-place'>{photo.place && photo.place}</p>

        <div>
          <img className='user-photo profile-posts'
            onClick={openModal}
            src={`${import.meta.env.VITE_APP_BACKEND.replace(/\/+$/, '')}/uploads/photos/${photo.idUser}/${photo.photo}`}
            alt={photo.description}
          />
          <DeletePost photo={photo} removePost={removePost} />
        </div>
        {isModalOpen && (
          <Modal
            photo={photo}
            addComment={addComment}
            editComment={editComment}
            closeModal={closeModal}
            removeComment={removeComment}
            toggleLike={toggleLike}
          />
        )}
      </div>
      {!idUser && (
        <div className='like-and-comment-buttons'>
          <LikeButton toggleLike={toggleLike} photo={photo} />
          <button className='comment-button' onClick={openModal}>
            💬
          </button>
        </div>
      )}
      {!idUser && <UserDescription user={photo} />}
    </article>
  );
}

export default Photo;
