/**
 * task.js
 * 
 * Defines the Mongoose schema and model for a task. Allows tasks to be easily
 * stored in MongoDB.
 * 
 * Each task has:
 * - itemName:    Name of the task (TODO: change to just name)
 * - description: Description of the task
 * - deadline:    Time object: when the task is due
 * - complete:    Whether or not the task is complete (boolean)
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