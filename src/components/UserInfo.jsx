import { Link, useParams } from 'react-router-dom';

function UserInfo({ user, nombre, closeUserSearch }) {
  const { idUser } = useParams();
  return (
    <div className='user-info'>
      <Link
        to={`/users/${user.idUser}`}
        onClick={() => {
          closeUserSearch();
        }}
      >
        <img
          className='avatar-post'
          src={
            user.avatar
              ? `${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${user.idUser || idUser}/${user.avatar}`
              : `${import.meta.env.VITE_APP_BACKEND}/resources/DefaultAvatar.png`
          }
        />
        <div className='user-details'>
          <p>{user.username}</p>
          {nombre && <p className='name-user'>Nombre: {nombre}</p>}
        </div>
      </Link>
    </div>
  );
}

export default UserInfo;
