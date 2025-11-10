// Action creators and types for Todo operations.
// These are dispatched by UI components to mutate the Redux store.

export const ADD_TODO = 'ADD_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const SET_TODO_STATUS = 'SET_TODO_STATUS';
export const DELETE_TODO = 'DELETE_TODO';

// Adds a new todo with provided text. Other fields (like status) are set in reducer.
export const addTodo = (text) => ({
	type: ADD_TODO,
	payload: { text },
});

// Updates an existing todo's text by id.
export const updateTodo = (id, newText) => ({
	type: UPDATE_TODO,
	payload: { id, newText },
});

// Sets a todo's status to either 'in_progress' or 'completed'.
export const setTodoStatus = (id, status) => ({
	type: SET_TODO_STATUS,
	payload: { id, status },
});

// Removes a todo from the list by id.
export const deleteTodo = (id) => ({
	type: DELETE_TODO,
	payload: { id },
});