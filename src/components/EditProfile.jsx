import { useState, useContext, useEffect } from "react";
import { editUserData, changeAvatar, deleteAccount} from '../services/index';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { DeleteProfile } from '../components/DeleteProfile';


export const EditProfile = ({closeEditProfile}) => {
	const navigate = useNavigate();
	const {token, idUser, avatar, userName, setAvatar, userCreatedAt, logout} = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [newAvatar, setNewAvatar] = useState('')
	const [pwd, setPwd] = useState('');
	const [pwdNew, setPwdNew] = useState('');
	const [repeatpwd, setRepeatPwd] = useState('');
	const [error, setError] = useState('');
	const [deleteProfile, setDeleteProfile] = useState(false);



	const openDeleteProfile = () => {
		setDeleteProfile(true);
	};
	
	const closeDeleteProfile = () => {
		setDeleteProfile(false);
	};


	const handleEditForm = async (e) => {
		e.preventDefault();
		setError('');
	
		if (pwdNew !== repeatpwd) {
			setError('Las contraseñas no coinciden');
			return;
		}
		try {
			const response = await editUserData({token, idUser, email, name, username, pwd, pwdNew, repeatpwd});
			if(response.status === 'OK'){
				navigate('/login');
				logout();
			}
			
		} catch (error) {
			console.log(error.message);
			setError(error.message);
		}
	};

	const handleNewAvatar = async (e) => {
		e.preventDefault();
		setError('');
		try {
			const formData = new FormData();
			if(newAvatar) {
				formData.append('avatar', newAvatar)
				await changeAvatar({token, avatar:formData});
				setAvatar(newAvatar)
			}
			
		} catch (error) {
			console.log(error.message);
			setError(error.message);		
		}
	};





	const handleOverlayClick = (e) => {
		// Verificar si el clic ocurrió en el fondo del modal
		if (e.target.classList.contains("modal-overlay")) {
			closeEditProfile();
		}
		};

		useEffect(()=>{
			setNewAvatar('')
		},[avatar])



	return (
		<section className="modal-overlay" onClick={handleOverlayClick}>
			<div className="modal-content">
			<h1>Editar perfil:</h1>
			<form onSubmit={handleNewAvatar}>
				<fieldset>
					<label>Avatar</label>
					<div>
						<img src={avatar ? 
							`${import.meta.env.VITE_APP_BACKEND}/uploads/avatarUser/${idUser}/${avatar}` 
							: 
							"../src/resources/userNoAvatar_icon.svg"} alt={`Avatar de ${userName}`}
						/>
						<input
								type='file'
								id='avatar'
								name='avatar'
								accept={"image/*"}
								onChange={(e) => setNewAvatar(e.target.files[0])}
						/>
						{newAvatar ? (
							<figure>
								<img
									src={URL.createObjectURL(newAvatar)}
									style={{ width: "100px" }}
									alt="Preview"
								/>
							</figure>
						) : null}
						<p>JPG, JPEG o PNG.</p>	 
					</div>	
				</fieldset>
				<button>Cambiar avatar</button>
			</form>
			<form onSubmit={handleEditForm}>
				<div>
					<fieldset>
						<label htmlFor='email'>Email * </label>
						<input
							type='email'
							id='email'
							name='email'
							required
							onChange={(e) => setEmail(e.target.value)}
						/>
						
					</fieldset>
					<fieldset>
						<label htmlFor='name'>Nombre * </label>
						<input
							type='name'
							id='name'
							name='name'
							required
							onChange={(e) => setName(e.target.value)}
						/>
					</fieldset>
					<fieldset>
						<label htmlFor='username'>Nombre de usuario * </label>
						<input
							type='username'
							id='username'
							name='username'
							required
							onChange={(e) => setUsername(e.target.value)}
						/>
					</fieldset>
					<fieldset>
						<label htmlFor='pwd'>Contraseña * </label>
						<input
							type='password'
							id='pwd'
							name='pwd'
							required
							onChange={(e) => setPwd(e.target.value)}
						/>
					</fieldset>
				</div>
				<p>/////////</p>  
				<div>
					<fieldset>
						<label htmlFor='newPwd'>Nueva Contraseña: </label>
						<input
							type='password'
							id='newPwd'
							name='newPwd'
							onChange={(e) => setPwdNew(e.target.value)}
						/>
					</fieldset>
					<fieldset>
						<label htmlFor='repeatpwd'>Confirmar nueva contraseña: </label>
						<input
							type='password'
							id='repeatNewPwd'
							name='repeatNewPwd'
							onChange={(e) => setRepeatPwd(e.target.value)}
						/>
					</fieldset>
				</div>
				<div>
				<button type="submit">Guardar cambios</button>
				{deleteProfile && <DeleteProfile closeDeleteProfile={closeDeleteProfile} />}
				<button type="button" onClick={openDeleteProfile}>Eliminar cuenta</button>
				
				</div>
				{error ? <p className="error-message">{error}</p> : null}
			</form>
			</div>
		</section>
	);
};
