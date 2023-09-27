import { Routes, Route } from 'react-router-dom';

import { Auth } from './components/Auth';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { UserProfile } from './pages/UserProfile';
import { AddPost } from './pages/AddPost';
import { NotFoundPage } from './pages/NotFoundPage';
import PhotosDescPage from './pages/PhotosDescPage';
import { useTheme } from './context/ThemeContext';

import './styles/modal.css'
import './App.css';

function App() {
  const { isLightMode } = useTheme();
  return (
    <div className={`body-app ${isLightMode ? 'light' : 'dark'}`}>
      <Auth />
      <main className='app'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users/:idUser' element={<UserProfile />} />
          <Route path='/entries/photos' element={<AddPost />} />
          <Route path='/entries/photos/search' element={<PhotosDescPage />} />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
