import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Curtain from './components/common/Curtain';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Curtain>
        <App />
      </Curtain>
    </BrowserRouter>
  </StrictMode>
);
