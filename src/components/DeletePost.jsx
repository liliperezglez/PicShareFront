import { useContext, useState } from 'react';
import { deletePhotosService } from '../services';
import { AuthContext } from '../context/AuthContext';

function DeletePost({ photo, removePost }) {
  const { token, idUser, role } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [deletePhoto, setDeletePhoto] = useState(false);


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
      {(role === 'admin' || (token && parseInt(photo.idUser) === parseInt(idUser))) && (
        <button
          className='deletePostButton'
          onClick={openDeletePhoto}
        >
          ❌
        </button>
      )}
       { (deletePhoto && (
    <section className='modal-overlay'>
      <div className='modal-content'>
        <h2>Esto eliminará la publicación</h2>
        <p>¿Deseas continuar?</p>
        <div className='buttonsDeletePost'>
        <button type='button' onClick={()=> {
          deletePost(photo.idEntry);
          closeDeletePhoto()
          }}>
          Aceptar
        </button>
        <button type='button' onClick={()=> {
          closeDeletePhoto()
          }}>
         Cancelar
        </button>
        </div>
        </div>
    </section>
        ))}
      {error ? <p className='error-message'>{error}</p> : null}
    </>
  );
}

export default DeletePost;
