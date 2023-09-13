import { useContext, useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import DeletePost from "./DeletePost";
import UserDescription from "./UserDescription";
import { AuthContext } from "../context/AuthContext";
import {
  likePhotoService,
  unlikePhotoService,
  getLikeStatusService,
} from "../services";

function Photo({ photo, removePost, addComment, idEntry }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useContext(AuthContext);
  const [likesCount, setLikesCount] = useState(photo.likes);
  const [liked, setLiked] = useState(false);
  const { idUser } = useParams();

  useEffect(() => {
    //Obtener info de likes desde el localstorage
    const likeInfo = localStorage.getItem(`photo_likes_${idEntry}`);
    if (likeInfo) {
      const parsedLikeInfo = JSON.parse(likeInfo);
      setLiked(parsedLikeInfo.liked === 1);
      setLikesCount(parsedLikeInfo.likesCount);
    }
    // Obtener el estado actual del "like" desde el servidor cuando se carga la foto
    async function fetchLikeStatus() {
      try {
        const response = await getLikeStatusService({ token, idEntry });
        setLiked(response.liked);
      } catch (error) {
        console.log("Error al obtener el estado del like:", error);
      }
    }

    fetchLikeStatus();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function calculateTimeDifference(date) {
    const currentDate = new Date();
    const postDate = new Date(date);
    const timeDifference = currentDate - postDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `Hace ${days} D.`;
    } else if (hours > 0) {
      return `Hace ${hours} h.`;
    } else if (minutes > 0) {
      return `Hace ${minutes} min.`;
    } else {
      return `Hace ${seconds} S.`;
    }
  }

  const handleLikeClick = async (e) => {
    e.preventDefault();
    try {
      const updatedLiked = !liked; // Cambia liked al valor opuesto

      // Actualiza el estado de liked
      setLiked(updatedLiked);

      // Realiza la acción de dar/quitar like en el servidor
      if (updatedLiked) {
        await likePhotoService({ token, idEntry });
        setLikesCount((prevCount) => prevCount + 1); // Aumenta el contador de likes
      } else {
        await unlikePhotoService({ token, idEntry });
        setLikesCount((prevCount) => prevCount - 1); // Disminuye el contador de likes
      }

      // Guardar información de los Likes en el almacenamiento local
      const likeInfo = {
        liked: updatedLiked ? 1 : 0,
        likesCount: updatedLiked ? likesCount + 1 : likesCount - 1,
      };
      localStorage.setItem(`photo_likes_${idEntry}`, JSON.stringify(likeInfo));
    } catch (error) {
      console.log("Error al procesar el like:", error);
    }
  };

  return (
    <article className="photo">
      <div className="userPostInfo">
        <UserInfo user={photo} />
      </div>
      <div className="photoDetails">
        <p className="photoDate">{calculateTimeDifference(photo.date)} </p>
        <p className="photoPlace">{photo.place && photo.place}</p>

        <DeletePost photo={photo} removePost={removePost} />
        <div>
          <img
            onClick={openModal}
            src={`${import.meta.env.VITE_APP_BACKEND.replace(
              /\/+$/,
              ""
            )}/uploads/photos/${photo.idUser}/${photo.photo}`}
            alt={photo.description}
          />
        </div>
        {isModalOpen && (
          <Modal
            photo={photo}
            addComment={addComment}
            closeModal={closeModal}
          />
        )}
      </div>
      <div className="likeANDcommentButtons">
        {token && (
          <button className="likeButton" onClick={handleLikeClick}>
            {liked ? "❤️" : "🤍"} {likesCount}
          </button>
        )}
        <button className="commentButton" onClick={openModal}>
          💬🗯
        </button>
      </div>
      <UserDescription user={photo} />
    </article>
  );
}

export default Photo;