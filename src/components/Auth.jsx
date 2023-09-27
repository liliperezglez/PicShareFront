import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Auth = () => {
  const { token, idUser, avatar, userName, logout } = useContext(AuthContext);

  return idUser && token ? (
    <div className='auth-log'>
      <Link to={`/users/${idUser}`} className='auth'>
        <img
          className='avatar-post'
          src={avatar ? `${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${idUser}/${avatar}` : '../src/resources/userNoAvatar_icon.svg'}
          alt='Avatar'
        />
        <p>{userName}</p>
      </Link>
    </div>
  ) : (
    <ul className='auth-register'>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
};
