import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import TokenCaducado from './TokenCaducado';

function CommentsOptions({ idComment, comment, idEntry, editComment, removeComment, tokenCaducadoVisible }) {
  const { token, idUser, role } = useContext(AuthContext);
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [newComment, setNewComment] = useState('');

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

  const changeComment = (idEntry, idComment, comment) => {
    editComment(idEntry, idComment, comment, token);
    closeOptions();
    setNewComment('');
  };

  const handleChangeComment = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <>
      {isOpenOption && (
        <div className='modal-overlay'>
          <div className='modal-content' key={idComment}>
            <div className='edit-comment'>
              <p>{comment.comment}</p>
              <form className='comment-form'>
                <input type='text' placeholder='Comentario editado' value={newComment} onChange={handleChangeComment} required />
                <button className='edit-comment-button' onClick={() => changeComment(idEntry, idComment, newComment)}>
                  Editar
                </button>
              </form>
              <div className='buttons-comment-options'>
                <button className='delete-comment-button delete-button' onClick={() => deleteComment(idComment, idEntry)}>
                  Eliminar comentario
                </button>
                <button className='close-comment-button secondary-button' onClick={closeOptions}>
                  Salir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {((token && parseInt(idUser) === parseInt(comment.idUser)) || role === 'admin') && (
        <button onClick={openOptions}>
          <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='currentColor' className='bi bi-gear-fill' viewBox='0 0 16 16'>
            <path d='M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z' />
          </svg>
        </button>
      )}
      {tokenCaducadoVisible && <TokenCaducado />}
    </>
  );
}

export default CommentsOptions;
