// src/userstory3/store/store.js
import { createStore } from 'redux';
import { rootReducer } from './reducers';
export const store = createStore(rootReducer);
