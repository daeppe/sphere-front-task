import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Providers } from './contexts/providers.jsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Providers>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Providers>
);
