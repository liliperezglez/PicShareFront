import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function LikeButton({ photo, toggleLike }) {
  const { token,idUser } = useContext(AuthContext);
  const [likesDe,setLikesDe]=useState(photo.likes)
  const [liked, setLiked] = useState(false);

  // Recuperar el estado de "me gusta" del localStorage al cargar el componente
//   useEffect(() => {
//     const savedLike = localStorage.getItem('liked');
//     if (savedLike) {
//       setLiked(true);
//     }
//   }, [likesDe]);


  const handleLikeClick = async (e) => {
    e.preventDefault();
        console.log(liked,"soy liked default")
        toggleLike(photo.idEntry, token);
        // if (likesDe < photo.likes){
        //      localStorage.removeItem('liked')
        //     console.log(liked,"a")
        //     console.log(likesDe,"b")
        //     console.log(photo.likes,"c")
        //     setLiked(false);
        // }else{
        //     localStorage.setItem('liked',"liked")
        // }
            setLiked(true);
        setLikesDe(photo.likes)
        // if (!liked) {
        //   localStorage.setItem('liked',"liked"); // Almacenar el "me gusta"
        // } else {
        //   localStorage.removeItem('liked'); // Eliminar el "me gusta"
        // }

  };

  return (
    <>
      {token && (
        <button className={`likeButton`} onClick={handleLikeClick}>
          { photo.likes <likesDe ? "❤️" : "🤍"} {photo.likes}
        </button>
      )}
    </>
  );
}
export default LikeButton;
