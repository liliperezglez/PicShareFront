import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Auth } from "./Auth";
import { AuthContext } from "../context/AuthContext";
import SearchOverlay from "./SearchOverlay";

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  const { idUser } = useContext(AuthContext);

  return (
    <header>
      <h1>
        <Link to="/">PicShare</Link>
      </h1>

      {isSearchOpen && <SearchOverlay closeSearch={closeSearch} />}
      <button className="searchButton" onClick={openSearch}>
        Buscar usuarios o photos
      </button>

      {idUser && (
        <Link to="/entries/photos">
          <img
          src="../src/resources/addNewPhoto_icon.svg"
          alt="Añadir Nuevo Post"
          height="35"
          width="35"
        />
        </Link>
      )}

      <nav>
        <Auth />
      </nav>
    </header>
  );
};
