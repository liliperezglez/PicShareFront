import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUserService } from "../services/index";
import { Loading } from "../components/Loading";
import PhotoList from "../components/PhotoList";
import usePosts from "../hooks/usePosts";
import LinkToUserProfile from "../components/LinkToUserProfile";

export const UserProfile = () => {
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
  const { idUser } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getSingleUserService(idUser);
        console.log(data, "Soy el data del perfil");
        setPhotos(data.photos);
        setUser(data.user);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (idUser) {
      fetchUserData();
    }
  }, [idUser]);

  return (
    <section>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        user && (
          <>
            <h1>Nombre: {user.name}</h1>
            <div>
              <p className="userRegister">
                Registrado el {new Date(user.date).toLocaleDateString()}
              </p>
              <LinkToUserProfile idUser={idUser} user={user} />
              <PhotoList
                photos={photos}
                addComment={addComment}
                removePost={removePost}
              />
            </div>
          </>
        )
      )}
    </section>
  );
};
