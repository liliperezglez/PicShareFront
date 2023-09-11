import SearchPhotos from "./SearchPhotos";
import UserOverlay from "./UserOverlay";

function SearchOverlay({ closeSearch }) {
  const handleOverlayClick = (e) => {
    // Verificar si el clic ocurrió en el fondo del modal
    if (e.target.classList.contains("search-overlay")) {
      closeSearch();
    }
  };

  return (
    <div className="search-overlay" onClick={handleOverlayClick}>
      <div className="search-content">
        <UserOverlay />
        <SearchPhotos />
      </div>
    </div>
  );
}

export default SearchOverlay;
