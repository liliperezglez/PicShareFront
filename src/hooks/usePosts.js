import { useEffect, useState } from "react";
import { getAllPhotosService } from "../services";

const usePosts = () => {
  const [photos, setPhotos] = useState([]);
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  }, [setPhotos]);

  const addPost = (data) => {
    setPhotos([data, ...photos]);
  };

  const removePost = (id) => {
    setPhotos(photos.filter((photo) => photo.id !== id));
  };

  const addComment = (data) => {
    setComment([data, ...comment]);
  };

  return { photos, error, loading, addPost, removePost, addComment };
};

export default usePosts;
