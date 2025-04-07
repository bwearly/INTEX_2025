import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ManageMoviesPage from './pages/admin/ManageMoviesPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/movies" element={<ManageMoviesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
