import { useContext, useState } from 'react';
import { deletePhotosService } from '../services';
import { AuthContext } from '../context/AuthContext';

function DeletePost({ photo, removePost }) {
  const { token, idUser, role } = useContext(AuthContext);
  const [error, setError] = useState('');

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
          onClick={() => {
            if (window.confirm(`¿Estás seguro de borrar esta publicación?`)) deletePost(photo.idEntry);
          }}
        >
          ❌
        </button>
      )}

      {error ? <p className='error-message'>{error}</p> : null}
    </>
  );
}

export default DeletePost;
