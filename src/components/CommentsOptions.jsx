function CommentsOptions({comment, closeOptions}) {
      const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeOptions();
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <p>{comment.comment}</p>
    
        <button onClick={closeOptions}>Salir</button>
      </div>
    </div>
  )
}

export default CommentsOptions