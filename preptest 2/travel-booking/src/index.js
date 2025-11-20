// src/index.js (swap to Router-driven App)
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './userstory2/routerConfig';
import { Provider } from 'react-redux';
import { store } from './userstory3/store/store';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // CRA PWA template
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
serviceWorkerRegistration.register();
