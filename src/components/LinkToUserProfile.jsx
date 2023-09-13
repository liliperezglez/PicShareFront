import React from "react";
import { Link } from "react-router-dom";

function LinkToUserProfile({ idUser, user }) {
  const currentUserId = user.idUser;

  // Verificar si la ruta actual coincide con la del usuario
  const isCurrent = currentUserId === parseInt(idUser);
  return (
    <div className="userInfo">
      <Link
        to={`/users/${idUser}`}
        className={isCurrent ? "disabled-link" : ""}
      >
        <>
          {user.avatar && (
            <img
              style={{ width: "50px" }}
              src={`${import.meta.env.VITE_APP_BACKEND.replace(
                /\/+$/,
                ""
              )}/uploads/avatarUser/${idUser}/${user.avatar}`}
              alt={user.username}
            />
          )}
          <p>{user.username}</p>
        </>
      </Link>
    </div>
  );
}

export default LinkToUserProfile;
