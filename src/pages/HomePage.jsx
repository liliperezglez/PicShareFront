import PhotoList from "../components/PhotoList";
import usePosts from "../hooks/usePosts";
import { Loading } from "../components/Loading";
import { useState } from "react";
import SearchOverlay from "../components/SearchOverlay";

export const HomePage = () => {
  const { photos, loading, error, addPost, removePost } = usePosts();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;
  return (
    <>
      <section>
        <h1>Posts</h1>
        {isSearchOpen && <SearchOverlay closeSearch={closeSearch} />}
        <button className="searchButton" onClick={openSearch}>
          Buscar usuarios o photos
        </button>
        <PhotoList photos={photos} removePost={removePost} />
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
