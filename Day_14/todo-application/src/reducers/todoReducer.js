import { ADD_TODO, UPDATE_TODO, SET_TODO_STATUS, DELETE_TODO } from '../actions/TodoActions';

// Reducer for todos list. Keeps an array of todo objects:
// { id: number, text: string, status: 'in_progress' | 'completed' }
const initialState = [];

const todoReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_TODO: {
			// Create a new todo; default status is 'in_progress'
			const { text } = action.payload;
			return [
				...state,
				{
					id: Date.now(),
					text,
					status: 'in_progress',
				},
			];
		}
		case UPDATE_TODO: {
			// Update todo text immutably
			const { id, newText } = action.payload;
			return state.map((todo) =>
				todo.id === id ? { ...todo, text: newText } : todo
			);
		}
		case SET_TODO_STATUS: {
			// Update todo status to either 'in_progress' or 'completed'
			const { id, status } = action.payload;
			return state.map((todo) =>
				todo.id === id ? { ...todo, status } : todo
			);
		}
		case DELETE_TODO: {
			// Remove todo by id
			const { id } = action.payload;
			return state.filter((todo) => todo.id !== id);
		}
		default:
			return state;
	}
};

export default todoReducer;

