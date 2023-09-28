import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserService } from '../services';
import { Header } from '../components/Header';
import LogoModoOscuro from '../resources/LogoModoOscuro.png';

export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [repeatpwd, setRepeatPwd] = useState('');
  const [error, setError] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();
    setError('');

    if (pwd !== repeatpwd) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const register = await registerUserService({ email, name, username, pwd, repeatpwd });
      alert(
        register.message.includes('recuperado')
          ? `${register.message}, se mantendrá tu antiguo nombre de usuario. Te echabamos de menos! 🥺`
          : `${register.message} 🥳`
      );
      navigate('/login');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <section className='form-pages'>
      <Header showNavHeader={false} />
      <img src={LogoModoOscuro} alt='Logo Modo Oscuro' className='logo-dark-mode' onClick={handleLogoClick} />
      <p>Regístrate para ver y compartir fotos con tus amigos.</p>
      <form className='form' onSubmit={handleForm}>
        <fieldset>
          <input type='email' id='email' name='email' placeholder='Correo electrónico' required onChange={(e) => setEmail(e.target.value)} />
        </fieldset>
        <fieldset>
          <input type='text' id='username' name='username' placeholder='Nombre de usuario' required onChange={(e) => setUsername(e.target.value)} />
        </fieldset>
        <fieldset>
          <input type='text' id='name' name='name' placeholder='Nombre completo' required onChange={(e) => setName(e.target.value)} />
        </fieldset>
        <fieldset>
          <input type='password' id='pwd' name='pwd' placeholder='Contraseña' required onChange={(e) => setPwd(e.target.value)} />
        </fieldset>
        <fieldset>
          <input type='password' id='repeatpwd' name='repeatpwd' placeholder='Confirmar contraseña' required onChange={(e) => setRepeatPwd(e.target.value)} />
        </fieldset>
        <button className='register-button'>Registrarse</button>
        <p id='login-link'>
          ¿Ya tienes una cuenta? <Link to='/login'>Entrar</Link>
        </p>
        {error ? <p className='error-message'>{error}</p> : null}
      </form>
      <Link to={'/'}>
        <button className='go-home-button'>Página principal</button>
      </Link>
    </section>
  );
};
