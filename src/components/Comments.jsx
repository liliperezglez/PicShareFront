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
                    {comment.edit_date && (
                      <svg xmlns='http://www.w3.org/2000/svg' width='11' height='11' fill='currentColor' className='bi bi-pencil-fill' viewBox='0 0 16 16'>
                        <path d='M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z' />
                      </svg>
                    )}
                    {comment.edit_date && ` ${formatDate(comment.edit_date && comment.edit_date)} | `}
                    <svg xmlns='http://www.w3.org/2000/svg' width='11' height='11' fill='currentColor' className='bi bi-clock-fill' viewBox='0 0 16 16'>
                      <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z' />
                    </svg>{' '}
                    {formatDate(comment.date)}
                  </div>{' '}
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
