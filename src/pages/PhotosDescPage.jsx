import { useState } from 'react';
import { getPhotosByDescService } from '../services/index';
import PhotoList from '../components/PhotoList';
import usePosts from '../hooks/usePosts';

export default function PhotosDescPage() {
  const [description, setDescription] = useState('');
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const { setPhotosDesc,photosDesc, addComment, editComment, removeComment } = usePosts();

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

  return (
    <section>
      <>
        <h1>Fotos</h1>
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
          <button type='submit'>Buscar fotos</button>
        </form>
        {searched && photosDesc.length > 0 && (
          <>
            <h3>Resultados de búsqueda:</h3>
            <div className='photosDesc-content'>
              <PhotoList photos={photosDesc} addComment={addComment} editComment={editComment} removeComment={removeComment} />
            </div>
          </>
        )}
        {loading ? <p>{loading}</p> : null}
        {error ? <p className='error-message'>{error}</p> : null}
      </>
    </section>
  );
}
