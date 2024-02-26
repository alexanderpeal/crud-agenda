/**
 * task-routes.js
 * 
 * Defines the routes that lead to API endpoints.
 */

const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const {body, validationResult, Result} = require('express-validator');

// Constants for HTTP status codes
const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;

// Task validation rules (ensure proper data types for task data fields)
const taskValidationRules = [
    body('itemName').optional().isString().withMessage('itemName must be a string'),
    body('description').optional().isString().withMessage('description must be a string'),
    body('deadline').optional().isISO8601().withMessage('deadline must be a valid date'),
    body('complete').optional().isBoolean().withMessage('complete must be a boolean')
];

// Error handling middleware
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(STATUS_BAD_REQUEST).json({
            errors: errors.array()
        });
    }
}

// Async handler to centralize error handling
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// CREATE a new item
router.post('/add', validate([
    ...taskValidationRules,
    body('itemName').notEmpty().withMessage('itemName is a required field')
]), asyncHandler(async (req, res) => {
    const newTask = new Task({...req.body});
    const savedTask = await newTask.save();
    console.log(`Created ${newTask}`);
    res.status(STATUS_CREATED).json(savedTask);
}))

// READ (read all tasks from the database)
router.get('/', asyncHandler(async (req, res) => {
    const tasks = await Task.find().lean();
    // res.render('tasks', { tasks });
    res.status(STATUS_OK).json(tasks);
}));    

// UPDATE an item (by task name)
router.patch('/:taskName', validate(taskValidationRules), asyncHandler(async (req, res) => {
    const updatedTask = await Task.findOneAndUpdate(
        { itemName: req.params.taskName },
        req.body,
        { new: true, runValidators: true }
    );
    if (!updatedTask) {
        return res.status(STATUS_NOT_FOUND).json({ message: 'Task not found' });
    }
    res.status(STATUS_OK).json(updatedTask);
}));

// DELETE an item (by task name)
router.delete('/:taskName', asyncHandler(async (req, res) => {
    const deletedTask = await Task.findOneAndDelete({ itemName: req.params.taskName });
    if (!deletedTask) {
        return res.status(STATUS_NOT_FOUND).json({ message: "Task not found" });
    }
    res.status(STATUS_OK).json(deletedTask);
}));

module.exports = router;