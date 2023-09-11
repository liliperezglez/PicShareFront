import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
  const { token, idUser, avatar, userName, logout } = useContext(AuthContext);

  return idUser && token ? (
    <div>
      <Link to={`/users/${idUser}`} className="auth">
        <img
          src={
            avatar
              ? `${
                  import.meta.env.VITE_APP_BACKEND
                }uploads/avatarUser/${idUser}/${avatar}`
              : "../src/resources/userNoAvatar_icon.svg"
          }
          height="40"
          width="40"
          alt="Avatar"
        />
        <p>{userName}</p>
      </Link>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  ) : (
    <ul className="auth">
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
};
