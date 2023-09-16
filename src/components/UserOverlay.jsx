import { useState } from 'react';
import SearchUser from './SearchUser';

function UserOverlay({ closeSearch }) {
  const [isUserOpen, setIsUserOpen] = useState(false);

  const openUserSearch = () => {
    setIsUserOpen(true);
  };

  const closeUserSearch = () => {
    setIsUserOpen(false);
  };
  return (
    <>
      {isUserOpen && <SearchUser closeUserSearch={closeUserSearch} closeSearch={closeSearch} />}
      <button className='searchUserButton' onClick={openUserSearch}>
        <input type='image' src='../../src/resources/users_icon.svg' alt='Buscar usuario' height='35' width='35' />
      </button>
    </>
  );
}

export default UserOverlay;
