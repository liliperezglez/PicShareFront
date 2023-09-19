import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function LikeButton({ photo, toggleLike }) {
  const { token,idUser } = useContext(AuthContext);
  // const [likedByUser, setLikedByUser] = useState(false);
  const [likedByUser, setLikedByUser] = useState(null);

  // if(Array.isArray(photo.likes)){
  //   if (photo.likes.some((like) => parseInt(like.idUser) === parseInt(idUser))){
  //     console.log("❤️ 1", photo.likes.length)
  //   }else{
  //     console.log( "🤍 2", photo.likes.length)

  //   }
  // }else{
  //   console.log( "🤍 3",photo.likes)
  // }

  
  useEffect(() => {
    // Aquí puedes colocar tu lógica condicional
    if (Array.isArray(photo.likes)) {
      if (photo.likes.some((like) => parseInt(like.idUser) === parseInt(idUser))) {
        console.log("❤️ 1");
        setLikedByUser("❤️");
      } else {
        console.log("🤍 2");
        setLikedByUser("🤍");
      }
    } else {
      console.log("🤍 3");
      setLikedByUser("🤍");
    }
  }, [photo.likes, idUser]); 
   


  const handleLikeClick = async (e) => {
    e.preventDefault();
    toggleLike(photo.idEntry, token, setLikedByUser);
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
