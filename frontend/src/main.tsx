import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Curtain from './components/common/Curtain';
const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <Curtain>
      <Home />
    </Curtain>
  </StrictMode>
);
