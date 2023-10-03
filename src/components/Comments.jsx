import UserInfo from './UserInfo';
import CommentsOptions from './CommentsOptions';
import { formatDate } from '../services/helpers/helpers';

function Comments({ photo, editComment, removeComment, tokenCaducadoVisible }) {
  return (
    <div className='comments'>
      {Array.isArray(photo.comments) && photo.comments.length > 0 ? (
        <>
          <p>
            {photo.comments.length} Comentario{photo.comments.length > 1 && 's'}:
          </p>
          <ul className='comments-list-container'>
            {photo.comments.map((comment) => (
              <div key={comment.idComment} className='user-comment'>
                <li className='comments-list'>
                  <UserInfo user={comment} />
                  <span className='comment'>{comment.comment}</span>
                </li>
                <div className='date-and-delete'>
                  <div className='comment-date'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='12' height='11' fill='currentColor' className='bi bi-clock-fill' viewBox='0 0 16 16'>
                      <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z' />
                    </svg>{' '}
                    {formatDate(comment.edit_date ? comment.edit_date : comment.date)}
                  </div>
                  <CommentsOptions
                    tokenCaducadoVisible={tokenCaducadoVisible}
                    editComment={editComment}
                    removeComment={removeComment}
                    idEntry={photo.idEntry}
                    idComment={comment.idComment}
                    comment={comment}
                  />
                </div>
              </div>
            ))}
          </ul>
        </>
      ) : (
        <p>No hay comentarios en esta publicación</p>
      )}
    </div>
  );
}

export default Comments;
