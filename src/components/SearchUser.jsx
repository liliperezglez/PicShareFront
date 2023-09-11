import { getUserByUsernameService } from "../services";
import { useState, useEffect } from "react";
import UserInfo from "./UserInfo";

function SearchUser({ closeUserSearch }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [users, setUsers] = useState([]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("user-overlay")) {
      closeUserSearch();
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUserByUsernameService(searchUsername);
        setError("");
        setUsers(data);
      } catch (error) {
        setError(error.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    if (searchUsername) {
      fetchUsers();
    }
  }, [searchUsername]);

  return (
    <form className="search-user">
      <div className="user-overlay" onClick={handleOverlayClick}>
        <div className="user-content">
          <fieldset>
            <label htmlFor="searchUser">Buscar por nombre de usuario</label>
            <input
              type="text"
              name="searchUser"
              id="searchUser"
              value={searchUsername}
              placeholder="Escribe el usuario"
              onChange={(e) => setSearchUsername(e.target.value)}
              required
            />
          </fieldset>
          {error ? <p>{error}</p> : null}
          {loading ? <p>Cargando...</p> : null}
          <ul className="list-search-user">
            {users.map((user) => (
              <li key={user.idUser} className="list-user">
                <UserInfo user={user} nombre={user.name} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  );
}

export default SearchUser;
