import UserInfo from "./UserInfo";
import CommentsOptions from "./CommentsOptions";
import { formatDate } from "../services/helpers/helpers";

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
              <li key={comment.idComment} className='comments-list'>
                <UserInfo user={comment} />: {comment.comment}
                <div className="comment-date">
                  {formatDate(
                    comment.edit_date ? comment.edit_date : comment.date
                  )}
                </div>
                  <CommentsOptions
                    editComment={editComment}
                    removeComment={removeComment}
                    idEntry={photo.idEntry}
                    idComment={comment.idComment}
                    comment={comment}
                  />
              </li>
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
