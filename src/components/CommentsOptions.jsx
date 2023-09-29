import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function CommentsOptions({ idComment, comment, idEntry, editComment, removeComment }) {
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
              <form className='edit-comment-form'>
                <input type='text' placeholder='Comentario Editado' value={newComment} onChange={handleChangeComment} required />
                <button className='edit-comment-button' onClick={() => changeComment(idEntry, idComment, newComment)}>
                  Editar
                </button>
              </form>
              <div className='buttons-comment-options'>
                <button className='delete-comment-button' onClick={() => deleteComment(idComment, idEntry)}>
                  Eliminar comentario
                </button>
                <button className='close-comment-button' onClick={closeOptions}>
                  Salir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {((token && parseInt(idUser) === parseInt(comment.idUser)) || role === 'admin') && <button onClick={openOptions}>⚙</button>}
    </>
  );
}

export default CommentsOptions;
