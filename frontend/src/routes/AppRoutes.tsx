import { Routes, Route } from 'react-router-dom';
import ManageMoviesPage from '../pages/admin/ManageMoviesPage';
import HomePage from '../pages/Home/Home';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin/movies" element={<ManageMoviesPage />} />
    </Routes>
  );
};

export default AppRoutes;
