import { addCommentService } from "../services";
import { useContext, useState } from "react";
import usePosts from "../hooks/usePosts";
// import { AuthContext } from "../context/AuthContext";
function CommentForm({ id }) {
  //  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { addComment } = usePosts();
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      //const comment = await addCommentService({ data:newComment,token, id });
      console.log("Soy el comentario de prueba de addComment ", newComment);

      addComment(newComment);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setNewComment("");
    }
    console.log(newComment);
  };
  return (
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
      <button type="submit"> Comentar</button>
      {error ? <p>{error}</p> : null}
      {loading ? <p>Comentando...</p> : null}
    </form>
  );
}

export default CommentForm;
