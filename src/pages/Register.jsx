import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUserService } from '../services';

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

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' name='email' required onChange={(e) => setEmail(e.target.value)} />
        </fieldset>
        <fieldset>
          <label htmlFor='username'>Nombre de usuario</label>
          <input type='username' id='username' name='username' required onChange={(e) => setUsername(e.target.value)} />
        </fieldset>
        <fieldset>
          <label htmlFor='name'>Nombre</label>
          <input type='name' id='name' name='name' required onChange={(e) => setName(e.target.value)} />
        </fieldset>
        <fieldset>
          <label htmlFor='pwd'>Contraseña</label>
          <input type='password' id='pwd' name='pwd' required onChange={(e) => setPwd(e.target.value)} />
        </fieldset>
        <fieldset>
          <label htmlFor='repeatpwd'>Confirmar contraseña</label>
          <input type='password' id='repeatpwd' name='repeatpwd' required onChange={(e) => setRepeatPwd(e.target.value)} />
        </fieldset>
        <button>Registrarse</button>
        {error ? <p className='error-message'>{error}</p> : null}
      </form>
    </section>
  );
};
