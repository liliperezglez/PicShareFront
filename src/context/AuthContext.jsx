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
  }, [token, idUser, name, userName, avatar, userCreatedAt]);

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


  return (
    <AuthContext.Provider
      value={{
        token,
        setRole,
        userCreatedAt,
        setAvatar,
        setToken,
        setIdUser,
        logout,
        idUser,
        avatar,
        name,
        userName,
        role,
        // user:{
        //   idUser,
        //   avatar,
        //   name,
        //   userName,
        //   role,
        // }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
