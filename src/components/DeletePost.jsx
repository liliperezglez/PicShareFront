import { useContext, useState } from 'react';
import { deletePhotosService } from '../services';
import { AuthContext } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

function DeletePost({ photo, removePost }) {
  const { token, idUser, role } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [deletePhoto, setDeletePhoto] = useState(false);
  const actualUser = useParams().idUser;

  const openDeletePhoto = () => {
    setDeletePhoto(true);
  };

  const closeDeletePhoto = () => {
    setDeletePhoto(false);
  };

  const deletePost = async (id) => {
    try {
      await deletePhotosService({ id, token });

      if (removePost) {
        removePost(id);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {role === 'admin' || (token && parseInt(photo.idUser) === parseInt(idUser)) ? (
        !actualUser ? (
          <button className='delete-post-button-home-page' onClick={openDeletePhoto}>
            <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' fill='currentColor' className='bi bi-three-dots' viewBox='0 0 16 16'>
              <path d='M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z' />
            </svg>
          </button>
        ) : (
          <button className='delete-post-button-user-profile' onClick={openDeletePhoto}>
            <svg xmlns='http://www.w3.org/2000/svg' width='25' height='25' fill='currentColor' className='bi bi-three-dots-vertical' viewBox='0 0 16 16'>
              <path d='M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z' />
            </svg>
          </button>
        )
      ) : null}

      {deletePhoto && (
        <section className='modal-overlay'>
          <div className='modal-content delete-post-content'>
            <h2>Esto eliminará la publicación</h2>
            <p>¿Deseas continuar?</p>
            <div className='buttons-delete-post'>
              <button
                type='button'
                className='delete-button'
                onClick={() => {
                  deletePost(photo.idEntry);
                  closeDeletePhoto();
                }}
              >
                Eliminar
              </button>
              <button
                type='button'
                className='secondary-button'
                onClick={() => {
                  closeDeletePhoto();
                }}
              >
                Salir
              </button>
            </div>
          </div>
        </section>
      )}
      {error ? <p className='error-message'>{error}</p> : null}
    </>
  );
}

export default DeletePost;
