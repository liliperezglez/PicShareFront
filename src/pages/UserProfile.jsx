import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleUserService } from '../services/index';
import { Loading } from '../components/Loading';
import PhotoList from '../components/PhotoList';
import usePosts from '../hooks/usePosts';
import { AuthContext } from '../context/AuthContext';
import { EditProfile } from '../components/EditProfile';

export const UserProfile = () => {
  const { idUser, avatar, setAvatar } = useContext(AuthContext);
  const [editProfile, setEditProfile] = useState(false);
  const [editProfileButton, setEditProfileButton] = useState(false);
  const [error, setError] = useState("");
  const [loading ,setLoading] = useState("")
  const actualUser = useParams().idUser;
  const [username,setUsername] =useState("");
  const [name,setName] =useState("");
  const [userLoaded, setUserLoaded] = useState(false);
  const { setPhotos, photos, user, setUser, removePost, addComment, editComment, removeComment } = usePosts();

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
        setPhotos(data.photos);
        setUser(data.user);
        setAvatar(data.user.avatar);
        setUsername(data.user.username)
        setName(data.user.name)
        setUserLoaded(true)
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [actualUser,user]);

  useEffect(() => {
    setEditProfileButton(parseInt(actualUser) === parseInt(idUser));
  }, [actualUser]);

  let avatarSrc = '';

  if (parseInt(idUser) === parseInt(actualUser) && avatar && user) {
    avatarSrc = `${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${actualUser}/${avatar}`;
  } else if (user && user.avatar && actualUser) {
    avatarSrc = `${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${actualUser}/${user.avatar}`;
  } else {
    avatarSrc = '../src/resources/userNoAvatar_icon.svg';
  }

  const updatedPhotos = photos.map((photoNew) => {
    if (parseInt(photoNew.idUser) === parseInt(user.idUser)) {
      return { ...photoNew, avatar: user.avatar, username: user.username };
    }
    return photoNew;
  });

  return (
    <section>
      {
        ( userLoaded) && (
          <div>
            <div>
              <img src={avatarSrc} alt={user.username} />
              <h2>{name}</h2>
              <h3>{username}</h3>
              {`Miembro desde ${new Date(user.date).toLocaleDateString()}`}
              <h4>Publicaciones: {photos.length}</h4>
            </div>
            {editProfile && <EditProfile closeEditProfile={closeEditProfile} />}
            {editProfileButton && <button onClick={openEditProfile}>Editar perfil</button>}
            <div>
              <p className='userRegister'></p>
              <PhotoList
                photos={updatedPhotos}
                addComment={addComment}
                editComment={editComment}
                removeComment={removeComment}
                username={username}
                removePost={removePost}
              />
            </div>
          </div>
        )
        }
        {loading ? <Loading />:null}
        {error ? <p className="error-message">{error}</p> : null}
    </section>
  );
};
