import { useState } from "react";
import { getPhotosByDesc } from "../services/index";
import PhotoList from "../components/PhotoList";

export default function PhotosDescPage() {
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await getPhotosByDesc(description);
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
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {searched && photos.length > 0 && (
        <>
          <h3>Resultados de búsqueda:</h3>
          <div className="photosDesc-content">
            <PhotoList photos={photos} />
          </div>
        </>
      )}
    </section>
  );
}
