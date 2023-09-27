import UserInfo from './UserInfo';
import CommentsOptions from './CommentsOptions';
import { formatDate } from '../services/helpers/helpers';

function Comments({ photo, editComment, removeComment }) {
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
                  <div className='comment-date'>{formatDate(comment.edit_date ? comment.edit_date : comment.date)}</div>
                  <CommentsOptions
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
