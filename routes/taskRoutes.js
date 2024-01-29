const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
    try {
        // Lean to fetch JSON
        const tasks = await Task.find().lean();
        res.render('layouts/tasks', {tasks: tasks});
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.post('/add', async(req, res) => {
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
})

module.exports = router;

