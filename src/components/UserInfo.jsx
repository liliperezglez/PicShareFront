import { Link, useParams } from "react-router-dom";

function UserInfo({ user, nombre }) {
  const { idUser } = useParams();
  if (user.avatar) {
    return (
      <div className="userInfo">
        <Link to={`/users/${user.idUser}`}>
          <img
            style={{ width: "50px" }}
            src={`${import.meta.env.VITE_APP_BACKEND.replace(
              /\/+$/,
              ""
            )}/uploads/avatarUser/${user.idUser || idUser}/${user.avatar}`}
            alt={user.username}
          />
          <div className="user-details">
            <p>{user.username}</p>
            {nombre && <p className="name-user">Nombre: {nombre}</p>}
          </div>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="userInfo">
        <Link to={`/users/${user.idUser || idUser}`}>
          <div className="user-details">
            <p>{user.username}</p>
            {nombre && <p className="name-user">Nombre: {nombre}</p>}
          </div>
        </Link>
      </div>
    );
  }
}

export default UserInfo;
