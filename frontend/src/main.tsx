import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <Home />
  </StrictMode>
);
