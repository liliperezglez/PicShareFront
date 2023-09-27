import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading';
import usePosts from '../hooks/usePosts';

export default function SearchPhotos() {
  const { loading, error } = usePosts;

  if (loading) return <Loading />;
  if (error) return <p className='error-message'>{error}</p>;

  return (
    <>
      <Link to='/entries/photos/search' className='search-photo-button'>
        <button className='search-photos-button'>
          <input type='image' src='../../src/resources/photoGallery_icon.svg' alt='Buscar foto' height='35' width='35' />
          <span>Buscar fotos</span>
        </button>
      </Link>
    </>
  );
}
