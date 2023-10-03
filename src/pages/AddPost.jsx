import { useContext, useState, useEffect } from 'react';
import { addPhotoService } from '../services';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import usePosts from '../hooks/usePosts';
import TokenCaducado from '../components/TokenCaducado';

export const AddPost = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useContext(AuthContext);
  const { tokenCaducadoVisible, setTokenCaducadoVisible } = usePosts();

  useEffect(() => {
    // Carga el token desde el localStorage
    const token = localStorage.getItem('token');

    if (token) {
      setToken(token);
    } else {
      setError('Token Caducado');
      setTokenCaducadoVisible(true);
    }
  }, []);

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('place', place);
      formData.append('description', description);
      formData.append('photo', photo);

      // Obtén el token de autenticación del contexto
      const token = localStorage.getItem('token');

      const response = await addPhotoService({ token, formData });

      // Verifica la respuesta y toma medidas en consecuencia
      navigate('/');
    } catch (error) {
      if (error.message === 'Token Caducado') {
        setTokenCaducadoVisible(true);
      }
      setError('Hubo un error al subir el post.', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='form-pages'>
      <Header showNavHeader={true} />
      <h1>Añade un Nuevo Post</h1>
      <form className='form add-post-form' onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <input type='file' accept='image/*' onChange={handlePhotoChange} required />
            {photo ? (
              <>
                <figure>
                  <img src={URL.createObjectURL(photo)} style={{ width: '300px' }} alt='Preview' />
                </figure>
                <div>
                  <input type='text' value={place} placeholder='Añade lugar' onChange={handlePlaceChange} />
                </div>
                <div>
                  <textarea value={description} maxLength='120' placeholder='Añade un pequeña descripción...' onChange={handleDescriptionChange} required />
                </div>
              </>
            ) : null}
          </div>
        </fieldset>
        <button className='main-button' type='submit' disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Publicar'}
        </button>
        {error ? <p className='error-message'>{error}</p> : null}
        {tokenCaducadoVisible && <TokenCaducado />}
      </form>
    </section>
  );
};
