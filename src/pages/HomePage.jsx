import { useEffect, useState } from 'react';
import PhotoList from '../components/PhotoList';
import usePosts from '../hooks/usePosts';
import { getAllPhotosService } from '../services';

export const HomePage = () => {
  const [error, setError] = useState("");
  const [loading ,setLoading] = useState("")
  const {
    setPhotos,
    photos,
    removePost,
    removeComment,
    editComment,
    addComment,
    toggleLike
  } = usePosts();

  useEffect(() => {
    const getPhotos = async () => {
      const data = await getAllPhotosService();
      try {
        setPhotos(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
      return data;
    };

    getPhotos();
  }, [photos.length]);

  return (
    <section>
          <h1>Posts</h1>
          <PhotoList
            photos={photos}
            removePost={removePost}
            addComment={addComment}
            editComment={editComment}
            removeComment={removeComment}
            toggleLike={toggleLike}
          />
          <aside>
            <p>
              😋😊 Estás al día en las últimas fotos subidas, Visita algún
              usuario para ver sus fotos 🎉🎆
            </p>
          </aside>
          {loading ? <p>{loading}</p>:null}
          {error ? <p className="error-message">{error}</p> : null}
    </section>
  );
};
