import { useEffect } from "react";
import PhotoList from "../components/PhotoList";
import usePosts from "../hooks/usePosts";
import { Loading } from "../components/Loading";
import { getAllPhotosService } from "../services";

export const HomePage = () => {
  const {
    setPhotos,
    photos,
    loading,
    setLoading,
    error,
    setError,
    addPost,
    removePost,
    addComment,
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

  console.log(photos, "soy de home");

  return (
    <section>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <h1>Posts</h1>
          <PhotoList
            photos={photos}
            removePost={removePost}
            addComment={addComment}
          />
          <aside>
            <p>
              😋😊 Estás al día en las últimas fotos subidas, Visita algún
              usuario para ver sus fotos 🎉🎆
            </p>
          </aside>
        </>
      )}
    </section>
  );
};
