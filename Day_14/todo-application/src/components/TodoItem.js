import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, setTodoStatus, deleteTodo } from '../actions/TodoActions';

// Renders a single todo item with inline edit, status controls, and delete.
const TodoItem = ({ todo }) => {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const [draftText, setDraftText] = useState(todo.text);

	const handleSave = () => {
		const trimmed = draftText.trim();
		if (trimmed.length === 0) return;
		dispatch(updateTodo(todo.id, trimmed));
		setIsEditing(false);
	};

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
			{/* Text or edit input */}
			{isEditing ? (
				<>
					<input
						type="text"
						value={draftText}
						onChange={(e) => setDraftText(e.target.value)}
					/>
					<button onClick={handleSave}>Save</button>
					<button onClick={() => { setIsEditing(false); setDraftText(todo.text); }}>Cancel</button>
				</>
			) : (
				<>
					<span>
						{todo.text} {todo.status === 'completed' ? '(Completed)' : '(In Progress)'}
					</span>
					<button onClick={() => setIsEditing(true)}>Edit</button>
				</>
			)}

			{/* Status controls */}
			<select
				value={todo.status}
				onChange={(e) => dispatch(setTodoStatus(todo.id, e.target.value))}
			>
				<option value="in_progress">In Progress</option>
				<option value="completed">Completed</option>
			</select>

			{/* Delete */}
			<button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
		</div>
	);
};

export default TodoItem;

