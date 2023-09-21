import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function LikeButton({ photo, toggleLike }) {
  const { token,idUser } = useContext(AuthContext);
  const [likedByUser, setLikedByUser] = useState(null);
  // const actualUser = useParams().idUser;
  
  useEffect(() => {
    if (Array.isArray(photo.likes)) {
      if (photo.likes.some((like) => parseInt(like.idUser) === parseInt(idUser))) {
        setLikedByUser("❤️");
      } else {
        setLikedByUser("🤍");
      }
    } else {
      setLikedByUser("🤍");
    }
  }, [photo.likes, idUser]); 
   
  
  const handleLikeClick = async (e) => {
    e.preventDefault();
    toggleLike({ token: token, idEntry:photo.idEntry, actualUser:photo.idUser, description:photo.description} );
    console.log("pepe")
  };


  return (
    <>
      {token && (
        <button className={`likeButton`} onClick={handleLikeClick}>
         {likedByUser} {Array.isArray(photo.likes) ? photo.likes.length : photo.likes}
        </button>
      )}
    </>
  );
}
export default LikeButton;
