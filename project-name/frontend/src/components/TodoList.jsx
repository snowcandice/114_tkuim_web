import React, { useEffect, useState } from 'react';
import { getTodos } from '../api/api';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await getTodos();
            if (res.data.success) {
                setTodos(res.data.data);
            }
        } catch (err) {
            console.error('Error fetching todos:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = (newTodo) => {
        setTodos([newTodo, ...todos]);
    };

    const handleUpdate = (updatedTodo) => {
        setTodos(todos.map((t) => (t._id === updatedTodo._id ? updatedTodo : t)));
    };

    const handleDelete = (id) => {
        setTodos(todos.filter((t) => t._id !== id));
    };

    if (loading) return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading tasks...</div>;

    return (
        <div className="container auth-wrapper">
            <h1>My Tasks</h1>
            <TodoForm onAdd={handleAdd} />
            <ul className="todo-list">
                {todos.map((todo) => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
                {todos.length === 0 && (
                    <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>No tasks yet. Add one above!</p>
                )}
            </ul>
        </div>
    );
};

export default TodoList;
