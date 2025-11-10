import React from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

// Root UI for the todo feature: shows add form and the list.
const TodoApp = () => {
	return (
		<div>
			<h1>Todo Application</h1>
			<AddTodo />
			<TodoList />
		</div>
	);
};

export default TodoApp;

