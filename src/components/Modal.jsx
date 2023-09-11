import CommentForm from "./CommentForm";
import Comments from "./Comments";
import UserDescription from "./UserDescription";

function Modal({ photo, closeModal }) {
  const handleOverlayClick = (e) => {
    // Verificar si el clic ocurrió en el fondo del modal
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <img
          src={`${import.meta.env.VITE_APP_BACKEND.replace(
            /\/+$/,
            ""
          )}/uploads/photos/${photo.idUser}/${photo.photo}`}
          alt={photo.description}
        />
        <div>
          <UserDescription user={photo} />
        </div>

        <Comments photo={photo} />
        <CommentForm id={photo.idEntry} />
        <button onClick={closeModal}>Cerrar</button>
      </div>
    </div>
  );
}

export default Modal;
