// here we will write code for todo store functionality
import { ADD_TODO } from '../actions/TodoActions';
const initialState = {
    todos: [],
};

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, { id: Date.now(), text: action.payload }],
            };
        default:
            return state;
    }
};

export default todoReducer;