import { useContext, useState } from 'react';
import UserInfo from './UserInfo';
import { useParams } from 'react-router-dom';
import Modal from './Modal';
import DeletePost from './DeletePost';
import UserDescription from './UserDescription';
import { AuthContext } from '../context/AuthContext';
import LikeButton from './LikeButton';

function Photo({ photo, removePost, addComment, editComment,  removeComment, toggleLike }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { calculateTimeDifference } = useContext(AuthContext);

  const { idUser } = useParams();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <article className='photo'>
      <div className='userPostInfo'>{!idUser && <UserInfo user={photo} />}</div>
      <div className='photoDetails'>
        <p className='photoDate'>{calculateTimeDifference(photo.date)} </p>
        <p className='photoPlace'>{photo.place && photo.place}</p>

        <div>
          <img
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
        <div className='likeANDcommentButtons'>
          <LikeButton toggleLike={toggleLike} photo={photo} />
          <button className='commentButton' onClick={openModal}>
            💬🗯
          </button>
        </div>
      )}
      {!idUser && <UserDescription user={photo} />}
    </article>
  );
}

export default Photo;
