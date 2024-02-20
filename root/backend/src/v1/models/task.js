/**
 * task.js
 * 
 * Defines the Mongoose schema and model for a task. Allows tasks to be easily
 * stored in MongoDB.
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