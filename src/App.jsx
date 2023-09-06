import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UserProfile } from './pages/UserProfile';
import { AddPost } from './pages/AddPost';
import { NotFoundPage } from './pages/NotFoundPage';

import './App.css';

function App() {
	return (
		<main>
			<Header />

			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/users/:idUser' element={<UserProfile />} />
				<Route path='/entries/photos' element={<AddPost />} />
				<Route path='*' element={<NotFoundPage />} />
			</Routes>

			<Footer />
		</main>
	);
}

export default App;
