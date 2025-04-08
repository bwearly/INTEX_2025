import { useState } from 'react';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage';
import ManageMoviesPage from './pages/admin/ManageMoviesPage';
import CustomNavbar from './components/common/Navbar';

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
