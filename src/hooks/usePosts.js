import { useState, useContext } from "react";
import { addCommentService } from "../services";
import { AuthContext } from "../context/AuthContext";

const usePosts = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const { idUser, userName, avatar } = useContext(AuthContext);

  const addPost = (data) => {
    setPhotos([data, ...photos]);
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

  return {
    photos,
    error,
    loading,
    addPost,
    removePost,
    setPhotos,
    setError,
    setUser,
    user,
    addComment,
    setLoading,
  };
};

export default usePosts;
