import { useContext, useState } from 'react';
import { logInUserService } from '../services';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Header } from '../components/Header';
import LogoModoOscuro from '../resources/LogoModoOscuro.png';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const { setToken, setIdUser, setRole, setEmailAuth } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const data = await logInUserService({ email, pwd });
      setIdUser(data.idUser);
      setToken(data.token);
      setEmailAuth(data.email);
      setRole(data.role);
      navigate('/');
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  const handleLogoClick = () => {
    navigate('/'); 
  };

  return (
    <section className='form-pages'>
      <Header showNavHeader={false} />
      <img src={LogoModoOscuro} alt='Logo Modo Oscuro' className='logo-dark-mode' 
      onClick={handleLogoClick}/>
      <form className='form' onSubmit={handleForm}>
        <fieldset>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            placeholder='Correo electrónico'
            required
            autoComplete='current-email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <input type='password' name='pwd' id='pwd' value={pwd} placeholder='Contraseña' required onChange={(e) => setPwd(e.target.value)} />
        </fieldset>
        <button className='login-button'>Entrar</button>
        <p id='register-link'>
          ¿No tienes una cuenta? <Link to='/register'>Regístrate</Link>
        </p>
        {error ? <p className='error-message'>{error}</p> : null}
      </form>
      <Link to={'/'}>
        <button className='go-home-button'>Página principal</button>
      </Link>
    </section>
  );
};
