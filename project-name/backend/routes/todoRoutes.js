const express = require('express');
const router = express.Router();
const {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo,
} = require('../controllers/todoController');

const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getTodos)
    .post(protect, createTodo);

router.route('/:id')
    .get(protect, getTodo)
    .put(protect, updateTodo)
    .delete(protect, deleteTodo);

module.exports = router;
