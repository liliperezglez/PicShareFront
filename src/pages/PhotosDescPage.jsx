import { useState } from "react";
import { getPhotosByDescService } from "../services/index";
import PhotoList from "../components/PhotoList";
import usePosts from "../hooks/usePosts";

export default function PhotosDescPage() {
  const [description, setDescription] = useState("");
  const [searched, setSearched] = useState(false);
  const {
    setPhotos,
    photos,
    loading,
    setLoading,
    error,
    setError,
    addPost,
    addComment,
  } = usePosts();

  console.log(addComment, "Description");
  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await getPhotosByDescService(description);
      setPhotos(data);
      setSearched(true);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <h1>Fotos</h1>
          <form className="search-photos-form" onSubmit={handleSearch}>
            <fieldset>
              <label htmlFor="searchPhotos">Buscar Fotos por Descripción</label>
              <input
                type="text"
                id="searchPhotos"
                name="searchPhotos"
                placeholder="Escribe una descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </fieldset>
            <button type="submit">Buscar fotos</button>
          </form>
          {searched && photos.length > 0 && (
            <>
              <h3>Resultados de búsqueda:</h3>
              <div className="photosDesc-content">
                <PhotoList photos={photos} addComment={addComment} />
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
