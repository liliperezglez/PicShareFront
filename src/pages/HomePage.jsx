import { useEffect, useState } from 'react';

import PhotoList from '../components/PhotoList';
import { Header } from '../components/Header';
import usePosts from '../hooks/usePosts';
import { getAllPhotosService } from '../services';
import AnimationSayGoodBye from '../components/AnimationSayGoodBye';

export const HomePage = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const { setPhotos, photos, removePost, removeComment, editComment, addComment, tokenCaducadoVisible, setTokenCaducadoVisible, toggleLike } = usePosts();

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
      <div className='home'>
        <Header showNavHeader={true} />
        <div className='page-photo-list'>
          <PhotoList
            photos={photos}
            tokenCaducadoVisible={tokenCaducadoVisible}
            setTokenCaducadoVisible={setTokenCaducadoVisible}
            removePost={removePost}
            addComment={addComment}
            editComment={editComment}
            removeComment={removeComment}
            toggleLike={toggleLike}
          />
        </div>
      </div>
      <aside className='no-more-photos'>
        <p>
          <AnimationSayGoodBye />
          Estás al día en las últimas fotos subidas
          <AnimationSayGoodBye />
        </p>
        <span>Visita algún usuario para ver sus fotos.</span>
      </aside>
      {loading ? <p>{loading}</p> : null}
      {error ? <p className='error-message'>{error}</p> : null}
    </section>
  );
};
