import { useState } from 'react';
import { getPhotosByDescService } from '../services/index';
import PhotoList from '../components/PhotoList';
import usePosts from '../hooks/usePosts';
import { Header } from '../components/Header';

export default function PhotosDescPage() {
  const [description, setDescription] = useState('');
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const { setPhotosDesc, photosDesc, addComment, editComment, removeComment, toggleLike, tokenCaducadoVisible, setTokenCaducadoVisible } = usePosts();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await getPhotosByDescService(description);
      setPhotosDesc(data);
      setSearched(true);
      setError('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(photosDesc);
  return (
    <section className='search-page'>
      <Header showNavHeader={true} />
      <form className='search-photos-form' onSubmit={handleSearch}>
        <fieldset>
          <label htmlFor='searchPhotos'>Buscar Fotos por Descripción</label>
          <input
            type='text'
            id='searchPhotos'
            name='searchPhotos'
            placeholder='Escribe una descripción'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </fieldset>
        <button className='main-button' type='submit'>
          Buscar fotos
        </button>
      </form>
      {searched && !error && photosDesc.length > 0 && (
        <>
          <h3>Resultados de búsqueda:</h3>
          <div className='photos-desc-content'>
            <PhotoList
              photos={photosDesc}
              tokenCaducadoVisible={tokenCaducadoVisible}
              setTokenCaducadoVisible={setTokenCaducadoVisible}
              addComment={addComment}
              editComment={editComment}
              removeComment={removeComment}
              toggleLike={toggleLike}
            />
          </div>
        </>
      )}
      {loading ? <p>{loading}</p> : null}
      {error ? <p className='error-message'>{error}</p> : null}
    </section>
  );
}
