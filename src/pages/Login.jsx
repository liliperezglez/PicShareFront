import { useContext, useState } from 'react';
import { logInUserService } from '../services';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/forms.css';
import { Header } from '../components/Header';


export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const { setToken, setIdUser, setRole } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const data = await logInUserService({ email, pwd });
      setIdUser(data.idUser);
      setToken(data.token);
      setRole(data.role);
      navigate('/');
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <section className='form'>
      <Header showNavHeader={false} />
      <h1>Login(aquí meteremos el logo con imagen)</h1>
      <form onSubmit={handleForm}>
        <fieldset>
          <input
            type='email'name='email'id='email'value={email} placeholder='Correo electrónico' required autoComplete='current-email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <input type='password' name='pwd' id='pwd' value={pwd} placeholder='Contraseña' required onChange={(e) => setPwd(e.target.value)} />
        </fieldset>
        <button className='login-button'>Entrar</button>
        <p id="register-link">¿No tienes una cuenta? <a href='/register'>Regístrate</a></p>
        {error ? <p className='error-message'>{error}</p> : null}
      </form>
    </section>
  );
};
