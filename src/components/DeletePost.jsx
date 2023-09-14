import { useContext, useState } from "react";
import { deletePhotosService } from "../services";
import { AuthContext } from "../context/AuthContext";

function DeletePost({ photo, removePost }) {
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");

  const deletePost = async (id) => {
    console.log(id, "Soy el que supuestamente se borra");
    try {
      await deletePhotosService({ id, token });

      if (removePost) {
        removePost(id);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <button
        className="deletePostButton"
        onClick={() => {
          if (
            window.confirm(`¿Estás seguro de borrar el post? ${photo.idEntry}`)
          )
            deletePost(photo.idEntry);
        }}
      >
        ❌
      </button>

      {error ? <p className="error-message">{error}</p> : null}
    </>
  );
}

export default DeletePost;
