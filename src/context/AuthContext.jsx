import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyUserDataService } from '../services/index';

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [idUser, setIdUser] = useState(localStorage.getItem('idUser'));
  const [name, setName] = useState('');
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [emailAuth, setEmailAuth] = useState(localStorage.getItem('email'));
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userCreatedAt, setUserCreatedAt] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('token', token);
    localStorage.setItem('idUser', idUser);
    localStorage.setItem('role', role);
    localStorage.setItem('email', emailAuth);

    if (token && idUser) {
      getMyUserDataService(idUser).then((userData) => {
        setName(userData.name);
        setUserName(userData.username);
        setAvatar(userData.avatar);
        setUserCreatedAt(userData.date);
      });
    }
  }, [token, idUser, name, userName, avatar, userCreatedAt]);

  function logout() {
    setToken('');
    setIdUser('');
    setRole('');
    setEmailAuth('');
    setName('');
    setUserName('');
    setAvatar('');
    setUserCreatedAt('');
    navigate('/');
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        userCreatedAt,
        setRole,
        setEmailAuth,
        setAvatar,
        setToken,
        setIdUser,
        logout,
        idUser,
        avatar,
        name,
        userName,
        role,
        emailAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
