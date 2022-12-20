import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles
      styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
    />
    <CssBaseline />
    <App />
  </React.StrictMode>
);
