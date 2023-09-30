import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProviderComponent } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProviderComponent>
          <App />
        </AuthProviderComponent>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
