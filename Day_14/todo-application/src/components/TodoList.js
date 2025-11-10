// Renders the list of todos from the Redux store.
import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = () => {
	const todos = useSelector((state) => state.todos);

	if (!todos || todos.length === 0) {
		return <div>No todos yet. Add one above.</div>;
	}

	return (
		<div>
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</div>
	);
};

export default TodoList;