import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // New React 18+ API
import { BrowserRouter } from 'react-router-dom'; // Provides client-side routing
import App from './App'; // Main application component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styling globally
import './index.css'; // Custom global styles
import Curtain from './components/common/Curtain'; // Optional loading animation or transition wrapper

// Get the root DOM node where the React app will mount
const root = createRoot(document.getElementById('root')!);

// Render the app tree
root.render(
  <StrictMode>
    {/* Enables helpful React warnings in development */}
    <BrowserRouter>
      {/* Wraps the entire app to provide page transitions or loading effects */}
      <Curtain>
        <App />
      </Curtain>
    </BrowserRouter>
  </StrictMode>
);
