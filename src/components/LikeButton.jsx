import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function LikeButton({ photo, toggleLike }) {
  const { token, idUser } = useContext(AuthContext);
  const [likedByUser, setLikedByUser] = useState(null);
  // const actualUser = useParams().idUser;

  useEffect(() => {
    if (Array.isArray(photo.likes)) {
      if (photo.likes.some((like) => parseInt(like.idUser) === parseInt(idUser))) {
        setLikedByUser(
          <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='#e60000' className='bi bi-heart-fill' viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
          </svg>
        );
      } else {
        setLikedByUser(
          <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' className='bi bi-heart' viewBox='0 0 16 16'>
            <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
          </svg>
        );
      }
    } else {
      setLikedByUser(
        <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' className='bi bi-heart' viewBox='0 0 16 16'>
          <path d='m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z' />
        </svg>
      );
    }
  }, [photo.likes, idUser]);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    toggleLike({ token: token, idEntry: photo.idEntry, actualUser: photo.idUser, description: photo.description });
  };

  return (
    <>
      {token && (
        <button className={`like-button`} onClick={handleLikeClick}>
          {likedByUser} {Array.isArray(photo.likes) ? photo.likes.length : photo.likes}
        </button>
      )}
    </>
  );
}
export default LikeButton;
