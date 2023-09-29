import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import { deleteAccountService } from '../services';

export const DeleteProfile = ({ closeDeleteProfile }) => {
  const { token, idUser, avatar, name, userName, userCreatedAt, logout } = useContext(AuthContext);

  const handleOverlayClick = (e) => {
    // Verificar si el clic ocurrió en el fondo del modal
    if (e.target.classList.contains('modal-overlay')) {
      closeDeleteProfile();
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      await deleteAccountService({ token, idUser });
      alert(`Usuario borrado correctamente. Te echaremos de menos. 😢`);
      logout();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className='modal-overlay delete-profile' onClick={handleOverlayClick}>
      <div className='modal-content'>
        <h1>Eliminar cuenta</h1>
        <div>
          <img
            src={
              avatar
                ? `${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${idUser}/${avatar}`
                : '../src/resources/userNoAvatar_icon.svg'
            }
            alt={`Avatar de ${userName}`}
          />
          <p>Hola {name}.</p>
          <p>{`Eres miembro desde ${new Date(userCreatedAt).toLocaleDateString()}`}</p>
        </div>
        <div>
          <h2>Esto eliminará tu cuenta</h2>
          <p>Vas a eliminar tu cuenta de PicShare.</p>
          <p>Tu perfil dejará de ser accesible y tus acciones serán eliminadas.</p>
        </div>
        <div>
          <h2>¿Qué debes saber?</h2>
          <p>Podrás recuperar la cuenta registrándote de nuevo con los mismos datos.</p>
          <p></p>
        </div>
        <button type='button' className='secondary-button' onClick={handleDeleteAccount}>
          Eliminar cuenta
        </button>
      </div>
    </section>
  );
};
