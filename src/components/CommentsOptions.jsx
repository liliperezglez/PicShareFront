import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function CommentsOptions({ idComment, comment, idEntry, removeComment }) {
  const { token, idUser, role } = useContext(AuthContext);
  const [isOpenOption, setIsOpenOption] = useState(false);

  const openOptions = () => {
    setIsOpenOption(true);
  };

  const closeOptions = () => {
    setIsOpenOption(false);
  };

  const deleteComment = (idComment, idEntry) => {
    removeComment(idEntry, idComment, token);
    closeOptions();
  };

  return (
    <>
      {isOpenOption && (
        <div className='modal-overlay'>
          <div className='modal-content' key={idComment}>
            <p>{comment.comment}</p>
            <button onClick={() => deleteComment(idComment, idEntry)}>Eliminar comentario</button>
            <button onClick={closeOptions}>Salir</button>
          </div>
        </div>
      )}
      {((token && parseInt(idUser) === parseInt(comment.idUser)) || role === 'admin') && <button onClick={openOptions}>⚙</button>}
    </>
  );
}

export default CommentsOptions;
