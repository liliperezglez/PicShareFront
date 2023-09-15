import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleUserService } from '../services/index';
import { Loading } from '../components/Loading';
import PhotoList from '../components/PhotoList';
import usePosts from '../hooks/usePosts';
import { AuthContext } from '../context/AuthContext';
import { EditProfile } from '../components/EditProfile';


export const UserProfile = () => {
  const { token, idUser, avatar, setAvatar } = useContext(AuthContext);
  const [editProfile, setEditProfile] = useState(false);
  const [editProfileButton, setEditProfileButton] = useState(false);
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const actualUser = useParams().idUser;
  const {
    setPhotos,
    photos,
    loading,
    setLoading,
    error,
    setError,
    user,
    setUser,
    addPost,
    removePost,
    addComment,
  } = usePosts();


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
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
      fetchUserData();
  }, [actualUser, updateAvatar]);


  useEffect(() => {
    setEditProfileButton(parseInt(actualUser) === parseInt(idUser) ? 
    true : false);
  }, [actualUser]);
  

let avatarSrc = "";

if (parseInt(idUser) === parseInt(actualUser) && avatar && user ) {
  avatarSrc = `${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${actualUser}/${avatar}`;
} else if ( user && user.avatar && actualUser){
  avatarSrc = `${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${actualUser}/${user.avatar}`;
}else{
  avatarSrc = "../src/resources/userNoAvatar_icon.svg"
}


const updatedPhotos = photos.map((photoNew) => {
  if (parseInt(photoNew.idUser) === parseInt(user.idUser)) {    
    return {  ...photoNew,avatar:user.avatar,username:user.username};
  }
  return photoNew;
});

  return (
    <section>
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        user && (
          <div>
            <div>
              <img
                src={avatarSrc}
                alt={user.username}
              />
              <h2>{user.name}</h2>
              <h3>{user.username}</h3>
              {`Miembro desde ${new Date(user.date).toLocaleDateString()}`}
              <h4>Publicaciones: {photos.length}</h4>
            </div>
            {editProfile && <EditProfile closeEditProfile={closeEditProfile} />}
            { editProfileButton && <button onClick={openEditProfile}>Editar perfil</button> }
            <div>
              <p className='userRegister'></p>
              <PhotoList photos={updatedPhotos} addComment={addComment} username={user.username} removePost={removePost} />
            </div>
          </div>
        )
      )}
    </section>

  );
};