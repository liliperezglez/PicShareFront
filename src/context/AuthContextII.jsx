import { createContext, useEffect, useState } from "react";
import { logInUserService } from "../services";

export const AuthContext = createContext(null);

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await logInUserService();
        console.log("Prueba");
        setUser(data.idUser);
        console.log(data);
        setToken(data.token);

      } catch (error) {
        logout();
      }
    };

    if (token) getUserData();
  }, [token]);

  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token); // Guardar el token en localStorage
  };
  

  const logout = () => {
    setToken(""); // Limpiar el token
    setUser(null); // Limpiar los datos del usuario si los tienes
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
