import UserInfo from "./UserInfo";

function Comments({ photo }) {
  return (
    <div className="comments">
      <p>Comentarios:</p>
      {Array.isArray(photo.comments) && photo.comments.length > 0 ? (
        <ul className="comments-list-container">
          {photo.comments.map((comment, index) => (
            <li key={index} className="comments-list">
              <UserInfo user={comment} />: {comment.comment}
              <div className="comment-date">
                {comment.edit_date
                  ? new Date(comment.edit_date).toLocaleString()
                  : new Date(comment.date).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay comentarios en esta publicación</p>
      )}
    </div>
  );
}

export default Comments;
