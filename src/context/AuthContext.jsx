import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyUserDataService } from '../services/index';

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [idUser, setIdUser] = useState(localStorage.getItem('idUser'));
  const [name, setName] = useState('');
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userCreatedAt, setUserCreatedAt] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('idUser', idUser);
    localStorage.setItem('role', role);

    if (token && idUser) {
      getMyUserDataService(idUser).then((userData) => {
        setName(userData.user.name);
        setUserName(userData.user.username);
        setAvatar(userData.user.avatar);
        setUserCreatedAt(userData.user.date);
      });
    }
  }, [token, idUser, name, userName, avatar, userCreatedAt, calculateTimeDifference]);

  const logout = () => {
    setToken('');
    setIdUser('');
    setRole('');
    setName('');
    setUserName('');
    setAvatar('');
    setUserCreatedAt('');
    navigate('/');
  };

  function calculateTimeDifference(date) {
    const currentDate = new Date();
    const postDate = new Date(date);
    const timeDifference = currentDate - postDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `Hace ${days} D.`;
    } else if (hours > 0) {
      return `Hace ${hours} h.`;
    } else if (minutes > 0) {
      return `Hace ${minutes} min.`;
    } else {
      return `Hace ${seconds} S.`;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        idUser,
        name,
        userName,
        setRole,
        role,
        avatar,
        userCreatedAt,
        setAvatar,
        setToken,
        setIdUser,
        logout,
        calculateTimeDifference,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
