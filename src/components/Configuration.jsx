import { useContext, useState } from 'react';
import { EditProfile } from './EditProfile';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function Configuration({ closeConfig }) {
  const { logout, token } = useContext(AuthContext);
  const { isLightMode, toggleTheme } = useTheme();
  const [editProfile, setEditProfile] = useState(false);

  const openEditProfile = () => {
    setEditProfile(true);
  };

  const closeEditProfile = () => {
    setEditProfile(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('config-overlay')) {
      closeConfig();
    }
  };

  return (
    <>
      <div className='config-overlay' onClick={handleOverlayClick}>
        <div className='config-content'>
          {token && <button onClick={openEditProfile}>Editar Perfil</button>}
          {editProfile && <EditProfile closeEditProfile={closeEditProfile} />}
          <button onClick={toggleTheme}>{isLightMode ? '🌖' : '🌒'}</button>
          {token && <button onClick={logout}>Cerrar Sesión</button>}
        </div>
      </div>
    </>
  );
}

export default Configuration;
