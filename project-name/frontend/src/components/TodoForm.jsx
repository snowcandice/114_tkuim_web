import React, { useState } from 'react';
import { createTodo } from '../api/api';
import { FaPlus } from 'react-icons/fa';

const TodoForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        try {
            const res = await createTodo({ title });
            onAdd(res.data.data);
            setTitle('');
        } catch (err) {
            console.error('Error adding todo:', err);
        }
    };

    return (
        <form className="todo-form glass-panel" onSubmit={handleSubmit}>
            <input
                type="text"
                className="todo-input"
                placeholder="Add a new task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" className="add-btn">
                <FaPlus />
            </button>
        </form>
    );
};

export default TodoForm;
