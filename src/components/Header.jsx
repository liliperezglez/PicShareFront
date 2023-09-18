import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { Auth } from './Auth';
import { AuthContext } from '../context/AuthContext';
import SearchOverlay from './SearchOverlay';

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { idUser , token, avatar} = useContext(AuthContext);

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };


  return (
    <>
   <nav className='nav-menu'>
      <h1>
        <Link to='/'>PicShare</Link>
      </h1>

      {isSearchOpen && <SearchOverlay closeSearch={closeSearch} />}
      <button className='searchButton' onClick={openSearch}>
        Buscar usuarios o photos
      </button>

      {idUser && (
        <Link to='/entries/photos'>
          <img type='image' src='../../src/resources/addNewPhoto_icon.svg' height='35' width='35' />
        </Link>
      )}

      {(idUser && token) && 
      <Link to={`/users/${idUser}`}>
        <img
          src={
            avatar ? `${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${idUser}/${avatar}` : '../src/resources/userNoAvatar_icon.svg'
          }
          height='40'
          width='40'
          alt='Avatar'
        />
        <span>Perfil</span>
      </Link>}

    </nav>
        <Auth />
    </>
  );
};
