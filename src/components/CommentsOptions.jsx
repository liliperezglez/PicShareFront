import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function CommentsOptions({ idComment, comment, idEntry, editComment, removeComment }) {
  const { token, idUser, role } = useContext(AuthContext);
  const [isOpenOption, setIsOpenOption] = useState(false);
  const [newComment, setNewComment] = useState("");

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
    setNewComment("")
  };

  const handleChangeComment = (e) => {
    setNewComment(e.target.value);
  }

  return (
    <>
      {isOpenOption && (
        <div className='modal-overlay'>
          <div className='modal-content' key={idComment}>
            <p>{comment.comment}</p>
            <button onClick={() => deleteComment(idComment, idEntry)}>
              Eliminar comentario
                </button>
          <div>
          <form> <input 
          type="text" 
          value={newComment}
          onChange={handleChangeComment}
		      required />
          <button onClick={() => changeComment(idEntry, idComment, newComment)}>
              Editar comentario
                </button>
          </form>
          </div>
            <button onClick={closeOptions}>Salir</button>
          </div>
        </div>
      )}
      {((token && parseInt(idUser) === parseInt(comment.idUser)) || role === 'admin') && <button onClick={openOptions}>⚙</button>}
    </>
  );
}

export default CommentsOptions;
;