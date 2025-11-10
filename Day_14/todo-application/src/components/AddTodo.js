// AddTodo renders input to create a new todo and dispatches add action.
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../actions/TodoActions';

const AddTodo = () => {
	const [todoText, setTodoText] = useState('');
	const dispatch = useDispatch();
	
	const handleAddTodo = () => {
		const trimmed = todoText.trim();
		if (trimmed !== '') {
			dispatch(addTodo(trimmed));
			setTodoText('');
		}
	};

	return (
		<div style={{ marginBottom: 16 }}>
			<input
				type="text"
				value={todoText}
				onChange={(e) => setTodoText(e.target.value)}
				placeholder="Add a new todo"
			/>
			<button onClick={handleAddTodo} style={{ marginLeft: 8 }}>Add Todo</button>
		</div>
	);
};

export default AddTodo;