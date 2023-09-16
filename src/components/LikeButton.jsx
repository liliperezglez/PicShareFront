import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getLikeStatusService, likePhotoService, unlikePhotoService } from '../services';

function LikeButton({ photo }) {
  const [likesCount, setLikesCount] = useState(photo.likes);
  const { token } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Obtener info de likes desde el localstorage
    const likeInfo = localStorage.getItem(`photo_likes_${photo.idEntry}`);
    if (likeInfo) {
      const parsedLikeInfo = JSON.parse(likeInfo);
      setLiked(parsedLikeInfo.liked === 1);
      setLikesCount(parsedLikeInfo.likesCount);
    }
    // Obtener el estado actual del "like" desde el servidor cuando se carga la foto
    async function fetchLikeStatus() {
      try {
        const response = await getLikeStatusService({ token, idEntry: photo.idEntry });
        setLiked(response.liked);
      } catch (error) {
        console.log('Error al obtener el estado del like:', error);
      }
    }

    fetchLikeStatus();
  }, []);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    try {
      const updatedLiked = !liked; // Cambia liked al valor opuesto

      // Actualiza el estado de liked
      setLiked(updatedLiked);

      // Realiza la acción de dar/quitar like en el servidor
      if (updatedLiked) {
        await likePhotoService({ token, idEntry: photo.idEntry });
        setLikesCount((prevCount) => prevCount + 1); // Aumenta el contador de likes
      } else {
        await unlikePhotoService({ token, idEntry: photo.idEntry });
        setLikesCount((prevCount) => prevCount - 1); // Disminuye el contador de likes
      }

      // Guardar información de los Likes en el almacenamiento local
      const likeInfo = {
        liked: updatedLiked ? 1 : 0,
        likesCount: updatedLiked ? likesCount + 1 : likesCount - 1,
      };
      localStorage.setItem(`photo_likes_${photo.idEntry}`, JSON.stringify(likeInfo));
    } catch (error) {
      console.log('Error al procesar el like:', error);
    }
  };

  return (
    <>
      {token && (
        <button className='likeButton' onClick={handleLikeClick}>
          {liked ? '❤️' : '🤍'} {likesCount}
        </button>
      )}
    </>
  );
}

export default LikeButton;
