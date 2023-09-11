import { useContext, useState } from "react";
import { deletePhotosService } from "../services";

function DeletePost({ photo, removePost }) {
  const [error, setError] = useState("");

  const deletePost = async (id) => {
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
          if (window.confirm("¿Estás seguro?")) deletePost(photo.id);
        }}
      >
        ❌
      </button>
      {error ? <p>{error}</p> : null}
    </>
  );
}

export default DeletePost;
