import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUserService } from "../services/index";
import { Loading } from "../components/Loading";
import PhotoList from "../components/PhotoList";
import usePosts from "../hooks/usePosts";
import LinkToUserProfile from "../components/LinkToUserProfile";

export const UserProfile = () => {
  const { removePost } = usePosts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const { idUser } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getSingleUserService(idUser);
        console.log(data);
        setUserData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [idUser]);

  return (
    <section>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        userData && (
          <>
            <h1>Nombre: {userData.user.name}</h1>
            <div>
              <p className="userRegister">
                Registrado el{" "}
                {new Date(userData.user.date).toLocaleDateString()}
              </p>
              <LinkToUserProfile idUser={idUser} user={userData.user} />
              <PhotoList photos={userData.photos} removePost={removePost} />
            </div>
          </>
        )
      )}
    </section>
  );
};
