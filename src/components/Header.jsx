import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { Auth } from './Auth';
import { AuthContext } from '../context/AuthContext';
import UserOverlay from './UserOverlay';
import SearchPhotos from './SearchPhotos';
import Configuration from './Configuration';
import LogoModoOscuro from '../resources/LogoModoOscuro.png';
import LogoModoClaro from '../resources/LogoModoClaro.png';
import { useTheme } from '../context/ThemeContext';

export const Header = ({ showNavHeader }) => {
  const { idUser, token, avatar } = useContext(AuthContext);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const { isLightMode } = useTheme();
  
  const openConfig = () => {
    setIsConfigOpen(true);
  };

  const closeConfig = () => {
    setIsConfigOpen(false);
  };
  
  return (
    <>
      {showNavHeader && (
        <nav className='nav-header'>
          <div className='nav-menu'>
          <h1>
            <Link to='/'>
              {isLightMode ? (
                <img src={LogoModoClaro} alt='Logo Modo Claro' className='light-logo' />
              ) : (
                <img src={LogoModoOscuro} alt='Logo Modo Oscuro' className='dark-logo' />
              )}
            </Link>
          </h1>

            <UserOverlay />
            <SearchPhotos />

            {idUser && (
              <Link to='/entries/photos'>
                <button className='add-photos-button'>
                  {isLightMode ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
                    <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                    <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                  </svg>
                  ) : (
                    <svg xmlns='http://www.w3.org/2000/svg' width='35' height='35' fill='currentColor' className='bi bi-camera-fill' viewBox='0 0 16 16'>
                    <path d='M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z' />
                    <path d='M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z' />
                  </svg>
                  )}
                  <span>Publicar</span>
                </button>
              </Link>
            )}

            {idUser && token && (
              <Link to={`/users/${idUser}`}>
                <button className='go-perfil-button'>
                  <img
                    className='avatar-post'
                    src={avatar ? `${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${idUser}/${avatar}` : '../src/resources/userNoAvatar_icon.svg'}
                    height='40'
                    width='40'
                    alt='Avatar'
                  />
                  <span>Perfil</span>
                </button>
              </Link>
            )}
          </div>

          <>
            {isConfigOpen && <Configuration closeConfig={closeConfig} />}
            <>
              <button className='config-button' onClick={openConfig}>
                <svg xmlns='http://www.w3.org/2000/svg' width='35' height='35' fill='currentColor' className='bi bi-list' viewBox='0 0 16 16'>
                  <path
                    fillRule='evenodd'
                    d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
                  />
                </svg>
                <span>Más</span>
              </button>
            </>
          </>
        </nav>
      )}
    </>
  );
};
