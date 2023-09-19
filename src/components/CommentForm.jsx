import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

function CommentForm({ photo, addComment }) {
  const { token, idUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const newCommentData = {
        comment: newComment,
        idUser,
        date: new Date().toISOString(),
        token,
      };
      addComment({idEntry:photo.idEntry, newComment:newCommentData, actualUser:photo.idUser, description:photo.description});
      setNewComment('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {token && idUser && (
        <form className='comment-form' onSubmit={handleForm}>
          <fieldset>
            <input
              type='text'
              name='comment'
              id='comment'
              value={newComment}
              placeholder='Añade un nuevo comentario'
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </fieldset>
          <button type='submit'>Comentar</button>
          {error ? <p className='error-message'>{error}</p> : null}
        </form>
      )}
    </>
  );
}

export default CommentForm;
