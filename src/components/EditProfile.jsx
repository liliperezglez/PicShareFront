import { useState, useContext, useEffect } from 'react';
import { editUserDataService, changeAvatarService } from '../services/index';
import { AuthContext } from '../context/AuthContext';
import { DeleteProfile } from '../components/DeleteProfile';
import { useNavigate } from 'react-router-dom';

export const EditProfile = ({ closeEditProfile }) => {
  const navigate = useNavigate();
  const { token, idUser, avatar, userName, setAvatar, logout, name, emailAuth } = useContext(AuthContext);
  const [email, setEmail] = useState(emailAuth);
  const [nameEdit, setNameEdit] = useState(name);
  const [username, setUsername] = useState(userName);
  const [newAvatar, setNewAvatar] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdNew, setPwdNew] = useState('');
  const [repeatpwd, setRepeatPwd] = useState('');
  const [error, setError] = useState('');
  const [deleteProfile, setDeleteProfile] = useState(false);
  const [errorAvatar, setErrorAvatar] = useState('');
  const [message, setMessage] = useState('');

  const openDeleteProfile = () => {
    setDeleteProfile(true);
  };

  const closeDeleteProfile = () => {
    setDeleteProfile(false);
  };

  const handleEditForm = async (e) => {
    e.preventDefault();
    setError('');

    if (pwdNew !== repeatpwd) {
      setError('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await editUserDataService({ token, idUser, email, name: nameEdit, username, pwd, pwdNew, repeatpwd });
      if (response.status === 'OK' && pwdNew && repeatpwd) {
        alert('Se ha cambiado la contraseña. Serás redirigido a la página principal.');
        logout();
      }
      if (response.status === 'OK' && !(pwdNew && repeatpwd)) {
        alert('Información de usuario actualizada correctamente.');
        closeEditProfile();
      }
      e.target.reset();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNewAvatar = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const formData = new FormData();
      if (newAvatar) {
        formData.append('avatar', newAvatar);
        await changeAvatarService({ token, avatar: formData });
        setAvatar(newAvatar);
        setErrorAvatar('');
      } else {
        setErrorAvatar('Por favor, selecciona el archivo');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOverlayClick = (e) => {
    // Verificar si el clic ocurrió en el fondo del modal
    if (e.target.classList.contains('modal-overlay')) {
      closeEditProfile();
    }
  };

  useEffect(() => {
    setNewAvatar('');
  }, [avatar]);

  return (
    <section className='modal-overlay edit-profile' onClick={handleOverlayClick}>
      <div className='modal-content'>
        <h1>Editar perfil:</h1>
        <div className='user-data'>
          <form className='change-avatar' onSubmit={handleNewAvatar}>
            <fieldset>
              <label>Avatar</label>
              <div>
                <img
                  src={avatar ? `${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${idUser}/${avatar}` : '../src/resources/userNoAvatar_icon.svg'}
                  alt={`Avatar de ${userName}`}
                />
                <input
                  type='file'
                  id='avatar'
                  name='avatar'
                  accept={'image/*'}
                  onChange={(e) => {
                    setNewAvatar(e.target.files[0]);
                    setErrorAvatar('');
                  }}
                />
                {newAvatar ? (
                  <figure>
                    <img src={URL.createObjectURL(newAvatar)} style={{ width: '100px' }} alt='Preview' />
                  </figure>
                ) : null}
                <p>JPG, JPEG o PNG.</p>
              </div>
            </fieldset>
            <button className='main-button' >Cambiar avatar</button>
            {errorAvatar ? <p className='error-message'>{errorAvatar}</p> : null}
          </form>
          <form className='edit-user-data' onSubmit={handleEditForm}>
            <div>
              <fieldset>
                <label htmlFor='email'>Email * </label>
                <input type='email' id='email' name='email' value={email} required onChange={(e) => setEmail(e.target.value)} />
              </fieldset>
              <fieldset>
                <label htmlFor='username'>Nombre de usuario * </label>
                <input type='username' id='username' value={username} name='username' maxLength='12' required onChange={(e) => setUsername(e.target.value)} />
                {/* setUser({...user,username: e.target.value})} */}
              </fieldset>
              <fieldset>
                <label htmlFor='name'>Nombre * </label>
                <input type='name' id='name' name='name' value={nameEdit} maxLength='15' required onChange={(e) => setNameEdit(e.target.value)} />
              </fieldset>
              <fieldset>
                <label htmlFor='pwd'>Contraseña * </label>
                <input type='password' id='pwd' name='pwd' required onChange={(e) => setPwd(e.target.value)} />
              </fieldset>
            </div>
            {message ? <p>{message}</p> : null}
            <div>
              <fieldset>
                <label htmlFor='newPwd'>Nueva Contraseña: </label>
                <input type='password' id='newPwd' name='newPwd' onChange={(e) => setPwdNew(e.target.value)} />
              </fieldset>
              <fieldset>
                <label htmlFor='repeatpwd'>Confirmar nueva contraseña: </label>
                <input type='password' id='repeatNewPwd' name='repeatNewPwd' onChange={(e) => setRepeatPwd(e.target.value)} />
              </fieldset>
            </div>
            <div>
              <div>
                <button type='submit' className='main-button' >Guardar cambios</button>
                {deleteProfile && <DeleteProfile closeDeleteProfile={closeDeleteProfile} />}
                <button type='button' className='secondary-button' onClick={openDeleteProfile}>
                  Eliminar cuenta
                </button>
              </div>
            </div>
          </form>
        </div>
        {error ? <p className='error-message'>{error}</p> : null}
        <button type='button' className='secondary-button' onClick={closeEditProfile}>
          Salir
        </button>
      </div>
    </section>
  );
};
