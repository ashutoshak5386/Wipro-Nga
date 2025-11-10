// here we will create dispatcher for todo application
import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

// Creates the Redux store. DevTools is enabled when available.
const devTools =
	typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
		? window.__REDUX_DEVTOOLS_EXTENSION__()
		: undefined;

const store = createStore(rootReducer, devTools);

export default store;