import SearchPhotos from "./SearchPhotos";
import UserOverlay from "./UserOverlay";

function SearchOverlay({ closeSearch }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("search-overlay")) {
      closeSearch();
    }
  };

  return (
    <div className="search-overlay" onClick={handleOverlayClick}>
      <div className="search-content">
        <UserOverlay />
        <SearchPhotos closeSearch={closeSearch}/>
      </div>
    </div>
  );
}

export default SearchOverlay;
