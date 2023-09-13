import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function CommentForm({ id, addComment }) {
  const { token, idUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const newCommentData = {
        comment: newComment,
        idUser: idUser,
        date: new Date().toISOString(),
        token: token,
      };
      addComment(id, newCommentData);
      // updateComments(newCommentData);
      setNewComment("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {token && idUser && (
        <form className="new-comment" onSubmit={handleForm}>
          <fieldset>
            <input
              type="text"
              name="comment"
              id="comment"
              value={newComment}
              placeholder="Añade un nuevo comentario"
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </fieldset>
          <button type="submit">Comentar</button>
          {error ? <p>{error}</p> : null}
        </form>
      )}
    </>
  );
}

export default CommentForm;
