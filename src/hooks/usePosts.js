import { useState, useContext } from "react";
import { addCommentService, deleteCommentService, editCommentService } from "../services";
import { AuthContext } from "../context/AuthContext";
import { likePhotoService } from "../services";

const usePosts = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const { idUser, userName, avatar } = useContext(AuthContext);

const toggleLike = async (idEntry, token) => {
  const photo = photos.find((photo) => photo.idEntry === idEntry);
  if (!photo) return;

  try {
    const response = await likePhotoService({ token, idEntry });
    const updatedPhotos = photos.map((photo) =>
      photo.idEntry === idEntry ? { ...photo, likes: response.data.totalVotos,  } : photo
    );
    setPhotos(updatedPhotos);

  } catch (error) {
    console.error("Error al procesar el like:", error);
  }
};

  const removePost = (id) => {
    setPhotos(photos.filter((photo) => photo.idEntry !== id));
  };

  const addComment = async (idEntry, newComment) => {
    try {
      const response = await addCommentService({
        comment: newComment.comment,
        id: idEntry,
        token: newComment.token,
      });
      const updatedPhotos = photos.map((photo) => {
        if (photo.idEntry === idEntry) {
          const commentsOld =
            photo.comments !== "No hay comentarios en esta publicación"
              ? photo.comments
              : "";
          const updatedComments = [
            {
              ...response,
              idUser,
              avatar,
              username: userName,
              date: newComment.date,
            },
            ...commentsOld,
          ];
          return {
            ...photo,
            comments: updatedComments,
          };
        }
        return photo;
      });
      setPhotos(updatedPhotos);
    } catch (error) {
      setError(error.message);
    }
  };

  
  const removeComment = async (idEntry, idComment, token) => {
    try {
      await deleteCommentService({ id: idEntry, idComment, token });

      // Actualiza el estado de comentarios después de eliminar uno con éxito
      const updatedPhotos = photos.map((photo) => {
        if (photo.idEntry === idEntry) {
          photo.comments = photo.comments.filter((comment) => comment.idComment !== idComment);
        }
        return photo;
      });
      setPhotos(updatedPhotos);

    } catch (error) {
      setError(error.message);
      alert("No se ha podido borrar el comentario, prueba más tarde");
    }
  };

  const editComment = async (idEntry, idComment, comment, token) => {
    try {
      await editCommentService({ id: idEntry, idComment, comment, token });

      const updatedPhotos = photos.map((photo) => {
        if(photo.idEntry === idEntry) {
          photo.comments = photo.comments.map((existingComment) => {
            if (existingComment.idComment === idComment) {
              //Actualiza comentario
              existingComment.comment = comment;
            }
            return existingComment;
          });
        }
        return photo;
      });
      setPhotos(updatedPhotos);

    } catch (error) {
      setError(error.message);
      alert("No se ha podido editar el comentario, prueba más tarde");
    }
  };

  return {
    photos,
    error,
    loading,
    removePost,
    setPhotos,
    setError,
    setUser,
    user,
    addComment,
    setLoading,
    removeComment,
    editComment,
    toggleLike
  };
};

export default usePosts;
