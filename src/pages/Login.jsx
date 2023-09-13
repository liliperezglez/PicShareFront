import { useContext, useState } from "react";
import { logInUserService } from "../services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const { setToken, setIdUser } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const data = await logInUserService({ email, pwd });
      setIdUser(data.idUser);
      setToken(data.token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            required
            autoComplete="current-email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="pwd">Contraseña</label>
          <input
            type="password"
            name="pwd"
            id="pwd"
            value={pwd}
            required
            onChange={(e) => setPwd(e.target.value)}
          />
        </fieldset>
        <button>Login</button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};
