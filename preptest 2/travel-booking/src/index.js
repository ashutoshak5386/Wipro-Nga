// src/index.js (swap to Router-driven App)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './userstory2/routerConfig';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // CRA PWA template
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppRouter />);
serviceWorkerRegistration.register();
