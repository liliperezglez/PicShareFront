import { useEffect, useState, useContext } from "react";
import { getAllPhotosService, addCommentService } from "../services";
import { AuthContext } from "../context/AuthContext";

const usePosts = () => {
  const [photos, setPhotos] = useState([]);
  // const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { idUser, userName, avatar } = useContext(AuthContext);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const data = await getAllPhotosService();
        setPhotos(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getPhotos();
  }, []);

  const addPost = (data) => {
    setPhotos([data, ...photos]);
  };

  const removePost = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  const addComment = async (idEntry, newComment) => {
    console.log(idUser, avatar, userName);
    try {
      const response = await addCommentService({
        comment: newComment.comment,
        id: idEntry,
        token: newComment.token,
      });
      console.log(response, "response");
      const updatedPhotos = photos.map((photo) => {
        if (photo.idEntry === idEntry) {
          console.log(photo.comments, "comentarios ");
          const updatedComments = [
            {
              ...response,
              idUser,
              avatar,
              username: userName,
              date: newComment.date,
            },
            ...photo.comments,
          ];
          console.log(photo, "foto");
          console.log(photo.comments, "comments");
          //  setComments(updatedComments);
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
    addComment,
  };
};

export default usePosts;
