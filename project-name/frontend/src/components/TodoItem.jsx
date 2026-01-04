import React, { useState } from 'react';
import { updateTodo, deleteTodo } from '../api/api';
import { FaCheck, FaTrash, FaUndo, FaEdit, FaTimes } from 'react-icons/fa';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    const toggleComplete = async () => {
        try {
            const updated = { ...todo, status: todo.status === 'completed' ? 'pending' : 'completed' };
            const res = await updateTodo(todo._id, { status: updated.status });
            onUpdate(res.data.data);
        } catch (err) {
            console.error('Error updating todo:', err);
        }
    };

    const handleUpdateTitle = async () => {
        if (!editTitle.trim() || editTitle === todo.title) {
            setIsEditing(false);
            setEditTitle(todo.title);
            return;
        }
        try {
            const res = await updateTodo(todo._id, { title: editTitle });
            onUpdate(res.data.data);
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating todo title:', err);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTodo(todo._id);
            onDelete(todo._id);
        } catch (err) {
            console.error('Error deleting todo:', err);
        }
    };

    return (
        <li className={`todo-item ${todo.status === 'completed' ? 'completed' : ''}`}>
            {isEditing ? (
                <div style={{ flex: 1, display: 'flex', gap: '10px', marginRight: '10px' }}>
                    <input
                        type="text"
                        className="todo-input"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        autoFocus
                        style={{ padding: '8px' }}
                    />
                </div>
            ) : (
                <span className="todo-text">{todo.title}</span>
            )}

            <div className="todo-actions">
                {isEditing ? (
                    <>
                        <button className="icon-btn check" onClick={handleUpdateTitle} title="Save">
                            <FaCheck />
                        </button>
                        <button className="icon-btn delete" onClick={() => { setIsEditing(false); setEditTitle(todo.title); }} title="Cancel">
                            <FaTimes />
                        </button>
                    </>
                ) : (
                    <>
                        <button className="icon-btn" onClick={() => setIsEditing(true)} title="Edit">
                            <FaEdit />
                        </button>
                        <button className="icon-btn check" onClick={toggleComplete} title={todo.status === 'completed' ? "Undo" : "Complete"}>
                            {todo.status === 'completed' ? <FaUndo /> : <FaCheck />}
                        </button>
                        <button className="icon-btn delete" onClick={handleDelete} title="Delete">
                            <FaTrash />
                        </button>
                    </>
                )}
            </div>
        </li>
    );
};

export default TodoItem;
