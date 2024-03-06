/**
 * Defines the Mongoose schema and model for a task. Allows tasks to be easily
 * stored in MongoDB.
 * 
 * @module src/v1/models
 * @since 2024-02-28
 */

const mongoose = require('mongoose');

/**
 * Schema definition for a task.
 * 
 * @typedef {Object} TaskSchema
 * @property {String} name
 *      The name of the task. Required, trimmed, max. 100 characters.
 * @property {String} [description]
 *      An optional description of the task. Optional, trimmed, max 500
 *      characters.
 * @property {Date} [deadline]
 *      An optional deadline for the task.
 * @property {String} status
 *      The status of the task. Must be one of ['Complete', 'Incomplete',
 *      'In Progress']. Defaults to 'Incomplete'.
 * @property {Date} created_at
 *      The creation date of the task. Automatically set to the current date and
 *      time upon creation.
 * @property {Date} updated_at
 *      The date the task was last updated. Automatically updated to the current
 *      date and time upon any save operation.
 * 
 * TODO: Implement future date validation for the deadline field.
 * TODO: Add instance methods or static methods to enhance functionality, e.g.,
 *       to check if a task is overdue.
 */
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is a required field"],
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: false,
        trim: true,
        maxlength: 500
    },
    deadline: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['Complete', 'Incomplete', 'In Progress'],
        default: 'Incomplete'
    }
},{ timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task; //taskSchema };