import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleUserService } from '../services/index';
import { Loading } from '../components/Loading';
import PhotoList from '../components/PhotoList';
import usePosts from '../hooks/usePosts';
import { AuthContext } from '../context/AuthContext';
import { EditProfile } from '../components/EditProfile';
import { Header } from '../components/Header';
import '../styles/userProfile.css';

export const UserProfile = () => {
  const { idUser, avatar, setAvatar } = useContext(AuthContext);
  const [editProfile, setEditProfile] = useState(false);
  const [editProfileButton, setEditProfileButton] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const actualUser = useParams().idUser;
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [userLoaded, setUserLoaded] = useState(false);
  const { setPhotosUser, photosUser, user, setUser, removePost, addComment, editComment, removeComment, toggleLike } = usePosts();

  const openEditProfile = () => {
    setEditProfile(true);
  };

  const closeEditProfile = () => {
    setEditProfile(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getSingleUserService(actualUser);
        setPhotosUser(data.photos);
        setUser(data.user);
        setAvatar(data.user.avatar);
        setUsername(data.user.username);
        setName(data.user.name);
        setUserLoaded(true);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [actualUser, userLoaded]);

  useEffect(() => {
    setEditProfileButton(parseInt(actualUser) === parseInt(idUser));
  }, [actualUser]);

  let avatarSrc = '';

  if (parseInt(idUser) === parseInt(actualUser) && avatar && user) {
    avatarSrc = `${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${actualUser}/${avatar}`;
  } else if (user && user.avatar && actualUser) {
    avatarSrc = `${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${actualUser}/${user.avatar}`;
  } else {
    avatarSrc = '../../src/resources/userNoAvatar_icon.svg';
  }

  const updatedPhotosUser = photosUser.map((photoNew) => {
    if (parseInt(photoNew.idUser) === parseInt(user.idUser)) {
      return { ...photoNew, avatar: user.avatar, username: user.username };
    }
    return photoNew;
  });

  return (
    <section>
      {userLoaded && (
        <div>
          <Header showNavHeader={true} />
          <div className='user'>
            <img src={avatarSrc} alt={user.username} />
            <div className='user-data'>
              <div>
                <h2>{username}</h2>
                {editProfileButton && <button onClick={openEditProfile}>Editar perfil</button>}
              </div>
              <h3>{name}</h3>
              <h3>{photosUser.length} Publicaciones </h3>
              <h3>{`Miembro desde ${new Date(user.date).toLocaleDateString()}`}</h3>
            </div>
          </div>
          {editProfile && <EditProfile closeEditProfile={closeEditProfile} />}
          <div className='user-photo-list'>
            <PhotoList
              photos={updatedPhotosUser}
              addComment={addComment}
              editComment={editComment}
              removeComment={removeComment}
              username={username}
              removePost={removePost}
              toggleLike={toggleLike}
            />
          </div>
        </div>
      )}
      {loading ? <Loading /> : null}
      {error ? <p className='error-message'>{error}</p> : null}
    </section>
  );
};
