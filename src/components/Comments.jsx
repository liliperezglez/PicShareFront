import { useContext,useState } from "react";
import UserInfo from "./UserInfo";
import { AuthContext } from "../context/AuthContext";
import CommentsOptions from "./CommentsOptions";

function Comments({ photo }) {
  const { calculateTimeDifference } = useContext(AuthContext);
    const [isOpenOption, setIsOpenOption] = useState(false);

  const openOptions = () => {
    setIsOpenOption(true);
  };

  const closeOptions = () => {
    setIsOpenOption(false);
  };
  
  return (
    <div className="comments">
      {Array.isArray(photo.comments) && photo.comments.length > 0 ? (
        <>
          <p>
            {photo.comments.length} Comentario{photo.comments.length > 1 && "s"}:
          </p>
          <ul className="comments-list-container">
            {photo.comments.map((comment, index) => (
              <li key={index} className="comments-list">
                <UserInfo user={comment} />: {comment.comment}
                <div className="comment-date">
                  {calculateTimeDifference(
                    comment.edit_date ? comment.edit_date : comment.date
                  )}
                  <button onClick={openOptions}>
                    ⚙
                  {isOpenOption && <CommentsOptions comment={comment} closeOptions={closeOptions}/>}
                  </button>
                </div>
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
