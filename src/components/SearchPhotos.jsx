import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading';
import usePosts from '../hooks/usePosts';

export default function SearchPhotos({ closeSearch }) {
  const { loading, error } = usePosts;

  if (loading) return <Loading />;
  if (error) return <p className='error-message'>{error}</p>;

  return (
    <>
      <Link to='/entries/photos/search' onClick={closeSearch} className='searchPhotoButton'>
        <button className='searchPhotosButton'>
          <input type='image' src='../../src/resources/photoGallery_icon.svg' alt='Buscar foto' height='35' width='35' />
        </button>
      </Link>
    </>
  );
}
