import { useState, useContext } from 'react';
import { addCommentService, deleteCommentService, editCommentService, getAllPhotosService, getPhotosByDescService, getSingleUserService } from '../services';
import { AuthContext } from '../context/AuthContext';
import { likePhotoService } from '../services';

const usePosts = () => {
  const [photos, setPhotos] = useState([]);
  const [photosDesc, setPhotosDesc] = useState([]);
  const [photosUser, setPhotosUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const [tokenCaducadoVisible, setTokenCaducadoVisible] = useState(false);

  const toggleLike = async ({ token, idEntry, actualUser, description }) => {
    try {
      const response = await likePhotoService({ token, idEntry });

      const updatedPhotos = await getAllPhotosService();
      setPhotos(updatedPhotos);

      const updatedPhotosUser = await getSingleUserService(actualUser);
      setPhotosUser(updatedPhotosUser.photos);

      const updatedPhotosDesc = await getPhotosByDescService(description);
      setPhotosDesc(updatedPhotosDesc);
    } catch (error) {
      setError(error.message);
      if (error.message === 'Token Caducado') {
        setTokenCaducadoVisible(true);
      }
    }
  };

  const removePost = (id) => {
    setPhotos(photos.filter((photo) => photo.idEntry !== id));
    setPhotosDesc(photosDesc.filter((photo) => photo.idEntry !== id));
    setPhotosUser(photosUser.filter((photo) => photo.idEntry !== id));
  };

  const addComment = async ({ idEntry, newComment, actualUser, description }) => {
    try {
      await addCommentService({
        comment: newComment.comment,
        id: idEntry,
        token: newComment.token,
      });

      const updatedPhotos = await getAllPhotosService();
      const updatedPhotosUser = await getSingleUserService(actualUser);
      const updatedPhotosDesc = await getPhotosByDescService(description);

      setPhotos(updatedPhotos);
      setPhotosDesc(updatedPhotosDesc);
      setPhotosUser(updatedPhotosUser.photos);
    } catch (error) {
      setError(error.message);
      if (error.message === 'Token Caducado') {
        setTokenCaducadoVisible(true);
      }
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

      const updatedPhotosUser = photosUser.map((photo) => {
        if (photo.idEntry === idEntry) {
          photo.comments = photo.comments.filter((comment) => comment.idComment !== idComment);
        }
        return photo;
      });
      setPhotosUser(updatedPhotosUser);

      const updatedPhotosDesc = photosDesc.map((photo) => {
        if (photo.idEntry === idEntry) {
          photo.comments = photo.comments.filter((comment) => comment.idComment !== idComment);
        }
        return photo;
      });
      setPhotosDesc(updatedPhotosDesc);
    } catch (error) {
      setError(error.message);
      alert('No se ha podido borrar el comentario, prueba más tarde');
      if (error.message === 'Token Caducado') {
        setTokenCaducadoVisible(true);
      }
    }
  };

  const editComment = async (idEntry, idComment, comment, token) => {
    try {
      await editCommentService({ id: idEntry, idComment, comment, token });

      const updatedPhotos = photos.map((photo) => {
        if (photo.idEntry === idEntry) {
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

      const updatedPhotosUser = photosUser.map((photo) => {
        if (photo.idEntry === idEntry) {
          photo.comments = photo.comments.map((existingComment) => {
            if (existingComment.idComment === idComment) {
              existingComment.comment = comment;
            }
            return existingComment;
          });
        }
        return photo;
      });
      setPhotosUser(updatedPhotosUser);

      const updatedPhotosDesc = photosDesc.map((photo) => {
        if (photo.idEntry === idEntry) {
          photo.comments = photo.comments.map((existingComment) => {
            if (existingComment.idComment === idComment) {
              existingComment.comment = comment;
            }
            return existingComment;
          });
        }
        return photo;
      });
      setPhotosDesc(updatedPhotosDesc);
    } catch (error) {
      setError(error.message);
      alert('No se ha podido editar el comentario, prueba más tarde');
      if (error.message === 'Token Caducado') {
        setTokenCaducadoVisible(true);
      }
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
    toggleLike,
    setPhotosDesc,
    setPhotosUser,
    photosUser,
    photosDesc,
    tokenCaducadoVisible,
    setTokenCaducadoVisible,
  };
};

export default usePosts;
