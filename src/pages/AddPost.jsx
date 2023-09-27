import { useContext, useState, useEffect } from 'react';
import { addPhotoService } from '../services';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';


export const AddPost = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setToken, logout } = useContext(AuthContext);

  useEffect(() => {
    // Carga el token desde el localStorage
    const token = localStorage.getItem('token');
    console.log('Token cargado:', token);

    if (token) {
      setToken(token);
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
      console.log('Respuesta del servicio:', response);
      navigate('/');
    } catch (error) {
      console.error('Hubo un error al subir el post.', error);
      setError('Hubo un error al subir el post.', error);
      logout();
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
            <input type='text' value={place} placeholder='Añadir lugar' onChange={handlePlaceChange} />
          </div>
          <div>
            <textarea value={description} placeholder='Escribe un pie de foto...'onChange={handleDescriptionChange} required />
          </div> 
          </> ) : null}
          </div>
        </fieldset>
        <button className='add-post-button' type='submit' disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Publicar'}
        </button>
        {error ? <p className='error-message'>{error}</p> : null}
      </form>
    </section>
  );
};
