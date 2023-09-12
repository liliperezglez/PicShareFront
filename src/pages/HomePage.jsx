import PhotoList from "../components/PhotoList";
import usePosts from "../hooks/usePosts";
import { Loading } from "../components/Loading";

export const HomePage = () => {
  const { photos, loading, error, addPost, removePost, addComment } =
    usePosts();

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <>
      <section>
        <h1>Posts</h1>
        <PhotoList
          photos={photos}
          removePost={removePost}
          addComment={addComment}
        />
        <aside>
          <p>
            😋😊 Estás al día en las últimas fotos subidas, Visita algún usuario
            para ver sus fotos 🎉🎆
          </p>
        </aside>
      </section>
    </>
  );
};
