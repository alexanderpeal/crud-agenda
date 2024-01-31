/**
 * task.js
 * 
 * Defines the schema and model for a task to be ujsed by mongoose.
 */

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    itemName: String,
    description: String,
    deadline: Date,
    complete: Boolean
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;