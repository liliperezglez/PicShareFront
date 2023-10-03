import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import TokenCaducado from './TokenCaducado';
import usePosts from '../hooks/usePosts';

function LikeButton({ photo, toggleLike, tokenCaducadoVisible }) {
  const { token, idUser } = useContext(AuthContext);
  const [likedByUser, setLikedByUser] = useState(null);
  const [error, setError] = useState('');

  // const actualUser = useParams().idUser;

  useEffect(() => {
    if (Array.isArray(photo.likes)) {
      if (photo.likes.some((like) => parseInt(like.idUser) === parseInt(idUser))) {
        setLikedByUser('like');
      } else {
        setLikedByUser('');
      }
    } else {
      setLikedByUser('');
    }
  }, [photo.likes]);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    try {
      await toggleLike({ token: token, idEntry: photo.idEntry, actualUser: photo.idUser, description: photo.description });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {token && (
        <div className={`like-button ${likedByUser}`} onClick={handleLikeClick}>
          <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' className={likedByUser} viewBox='0 0 16 16'>
            <path fillRule='evenodd' d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z' />
          </svg>
          {Array.isArray(photo.likes) ? photo.likes.length : photo.likes}
        </div>
      )}
      {error ? <p className='error-message'>{error}</p> : null}
      {tokenCaducadoVisible && <TokenCaducado />}
    </>
  );
}
export default LikeButton;
