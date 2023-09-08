import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Auth } from './Auth';
import { AuthContext } from '../context/AuthContext';

export const Header = () => {
	const { idUser } = useContext(AuthContext);

	const handleSearchPhoto = () => {};

	const handleSearchUser = () => {};

	return (
		<header>
			<h1>
				<Link to='/'>PicShare</Link>
			</h1>

			<input
				type='image'
				src='../src/resources/users_icon.svg'
				alt='Buscar usuario'
				height='35'
				width='35'
				onClick={handleSearchUser}
			/>

			<input
				type='image'
				src='../src/resources/photoGallery_icon.svg'
				alt='Buscar foto'
				height='35'
				width='35'
				onClick={handleSearchPhoto}
			/>

			{idUser && (
				<input
					type='image'
					src='../src/resources/addNewPhoto_icon.svg'
					height='35'
					width='35'
				/>
			)}

			<nav>
				<Auth />
			</nav>
		</header>
	);
};
