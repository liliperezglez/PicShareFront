import { useState } from 'react';
import SearchUser from './SearchUser';

function UserOverlay() {
  const [isUserOpen, setIsUserOpen] = useState(false);

  const openUserSearch = () => {
    setIsUserOpen(true);
  };

  const closeUserSearch = () => {
    setIsUserOpen(false);
  };
  return (
    <>
      {isUserOpen && <SearchUser closeUserSearch={closeUserSearch} />}
      <button className='search-user-button' onClick={openUserSearch}>
        <input type='image' src='../../src/resources/users_icon.svg' alt='Buscar usuario' height='35' width='35' />
        <span>Buscar usuario</span>
      </button>
    </>
  );
}

export default UserOverlay;
