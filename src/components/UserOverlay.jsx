import { useState } from "react";
import SearchUser from "./SearchUser";

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
      <button className="searchUserButton" onClick={openUserSearch}>
        🙍🏽‍♂️🙍🏽‍♀️
      </button>
    </>
  );
}

export default UserOverlay;
