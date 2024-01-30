const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const {body, validationResult} = require('express-validator');

// CREATE a new item
router.post('/add', [
    body('itemName').notEmpty().withMessage(
        'itemName is a required field').isString().withMessage(
        'itemName must be a string'
    ),
    body('description').optional().isString(),
    body('deadline').optional().isISO8601().withMessage(
        'deadline must be a valid date'
    ),
    body('complete').optional().isBoolean().withMessage(
        'complete must be a boolean'),
], async(req, res) => {
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

// READ all items
router.get('/', async (req, res) => {
    try {
        // Lean fetches JSON. This way we can render using handlebars
        const tasks = await Task.find().lean();
        res.render('layouts/tasks', {tasks: tasks});
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// UPDATE an item

module.exports = router;