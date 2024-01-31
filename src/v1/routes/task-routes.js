/**
 * task-routes.js
 * 
 * Defines the routes that lead to API endpoints.
 */

const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const {body, validationResult} = require('express-validator');

// CREATE a new item
router.post('/add', [
    body('itemName').notEmpty().withMessage(
        'itemName is a required field').isString().withMessage(
        'itemName must be a string'),
    body('description').optional().isString(),
    body('deadline').optional().isISO8601().withMessage(
        'deadline must be a valid date'),
    body('complete').optional().isBoolean().withMessage(
        'complete must be a boolean'),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const newTask = new Task({
        itemName: req.body.itemName,
        description: req.body.description,
        deadline: req.body.deadline,
        complete: req.body.complete
    });

    try {
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// READ (read all tasks from the database)
router.get('/', async (req, res) => {
    try {
        // Lean fetches JSON. This way we can render using handlebars
        const tasks = await Task.find().lean();
        res.render('tasks', {tasks: tasks});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// UPDATE an item (by task name)
router.patch('/:taskName', [
    body('itemName').optional().isString().withMessage(
        'itemName must be a string'),
    body('description').optional().isString(),
    body('deadline').optional().isISO8601().withMessage(
        'deadline must be a valid date'),
    body('complete').optional().isBoolean().withMessage(
        'complete must be a boolean'),
], async (req, res) => {
    const taskName = req.params.taskName;
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        console.log(taskName);
        const updatedTask = await Task.findOneAndUpdate(
            {itemName: taskName},
            req.body,
            {new: true, runValidators: true}
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// DELETE an item (by task name)
router.delete('/:taskName', async (req, res) => {
    const taskName = req.params.taskName;

    try {
        const deletedTask = await Task.findOneAndDelete(
            {itemName: taskName},
        );

        if (!deletedTask) {
            return res.status(404).json({message: "Task not found"});
        }

        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;