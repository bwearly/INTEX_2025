import { useState } from 'react';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage'; // Adjust if inside /auth/LoginPage.tsx
import ManageMoviesPage from './pages/admin/ManageMoviesPage';
import CustomNavbar from './components/common/Navbar';
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'home' | 'admin'>('login');

  return (
    <>
      <CustomNavbar minimal={currentPage === 'login'} />

      {currentPage === 'login' && <LoginPage goTo={setCurrentPage} />}
      {currentPage === 'home' && <Home />}
      {currentPage === 'admin' && <ManageMoviesPage />}
    </>
  );
}

export default App;
