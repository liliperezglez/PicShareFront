import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { deleteAccount } from "../services";

export const DeleteProfile = ({closeDeleteProfile}) => {
    const navigate = useNavigate();
    const {token, idUser, avatar, userName, userCreatedAt, logout} = useContext(AuthContext);
    
	const handleOverlayClick = (e) => {
		// Verificar si el clic ocurrió en el fondo del modal
		if (e.target.classList.contains("modal-overlay")) {
			closeDeleteProfile();
		}
		};


        const handleDeleteAccount = async (e) => {
            e.preventDefault();
            try {
                await deleteAccount({token, idUser});
                alert('Usuario borrado correctamente. 😢')
                logout();
    
            } catch (error) {
                console.log(error.message);
            }
        };


    return(
        <section className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <h1>Eliminar cuenta</h1>
                    <div>
                    <img src={avatar ? 
							`${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${idUser}/${avatar}` 
							: 
							"../src/resources/userNoAvatar_icon.svg"} alt={`Avatar de ${userName}`}
						/>
                        <p>{userName}</p>
                        <p>{`Miembro desde ${new Date(userCreatedAt).toLocaleDateString()}`}</p>
                    </div>
                    <hr /> 
                    <div>
                        <h2>Esto eliminará tu cuenta</h2>
                        <p>Vas a comenzar el proceso de eliminar tu cuenta de PicShare.</p>
                        <p>Tu perfil dejará de ser accesible y tus acciones serán eliminadas.</p>
                    </div>
                    <hr /> 
                    <div>
                        <h1>¿Qué debes saber?</h1>
                        <p>Podrás recuperar la cuenta registrándote de nuevo con los mismos datos.</p>
                        <p></p>
                    </div>
                <button type="button" onClick={handleDeleteAccount}>Eliminar cuenta</button>
            </div>
        </section>
        )
}