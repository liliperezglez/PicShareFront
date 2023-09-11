import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyUserDataService } from "../services/index";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [idUser, setIdUser] = useState(localStorage.getItem("idUser"));
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [userCreatedAt, setUserCreatedAt] = useState("");
  const navigate = useNavigate("");

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("idUser", idUser);

    if (token && idUser) {
      getMyUserDataService(idUser).then((userData) => {
        console.log(userData);
        setName(userData.name);
        setUserName(userData.username);
        setAvatar(userData.avatar);
        setUserCreatedAt(userData.date);
      });
    }
  }, [token, idUser, name, userName, avatar, userCreatedAt]);

  const logout = () => {
    setToken("");
    setIdUser("");
    setName("");
    setUserName("");
    setAvatar("");
    setUserCreatedAt("");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        idUser,
        name,
        userName,
        avatar,
        userCreatedAt,
        setToken,
        setIdUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
