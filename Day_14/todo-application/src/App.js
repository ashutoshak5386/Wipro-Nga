// here we will call all the components and render the application
import React from 'react';
import { Provider } from 'react-redux';
import store from './dispatcher/Dispatcher';
import TodoApp from './components/TodoApp';

function App() {
    return (
        <Provider store={store}>
            <TodoApp />
        </Provider>
    );
}

export default App;