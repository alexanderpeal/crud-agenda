/** 
 * Express router providing task-related API routes.
 * 
 * @module src/v1/routes
 * @requires express
 * @since 2024-02-28
 * @author Alexander Peal
 */

// Setup (router, validation, task model)
const express = require('express');
const router = express.Router();
const Task = require('../models/task').default;
const {body, validationResult} = require('express-validator');

// HTTP status codes
// TODO: standardize the error response structure to make it easier for clients
// to parse.
const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_BAD_REQUEST = 400;
const STATUS_NOT_FOUND = 404;

/**
 * List of Validators, which ensure that the task given in any request body has
 * legal request body parameters. All tasks must have names and a status, but
 * the other fields are optional.
 * 
 * @const
 * @type {Array<ValidationChain>}
 */
const taskValidationRules = [
    body('name').optional().isString().withMessage('name must be a string'),
    body('description').optional().isString().withMessage('description must be a string'),
    body('deadline').optional().isISO8601().withMessage('deadline must be a valid date'),
    body('complete').optional().isBoolean().withMessage('complete must be a boolean')
];

/**
 * Middleware that checks taskValidationRules against the request body.
 * If the validation is unsuccessful, sends a bad request error with details
 * of the validation errors.
 * Ensures requests made to the server contain neccesary information and meet
 * expected formats.
 * 
 * @async
 * @param {Array<ValidationChain>} validations
 *      The list of validations to check the request body against
 * @returns
 *      The next middleware if successful, or nothing if the validation is 
 *      unsuccessful.
 */
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

/**
 * Middleware that sets up and handles promises for async functions.
 * By wrapping async functions with this middleware, it ensures that any
 * rejected promise/error is passed to the next error handling middleware,
 * preventing a server crash or error.
 * 
 * @async
 * @param {Function} fn
 *      The async function to be handled
 * @returns
 *      A new function that wraps the async function and error handling logic,
 *      conforming to Express.js's expected middleware signature, allowing it
 *      to be used in route definitions.
 */
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Defines a route for adding a new task, using middleware for validation and
 * async error handling. If validation passes, the asyncHandler middleware
 * manages the route's async logic by saving the task to the database
 * and responding with a 201 (Created) HTTP code and the created task.
 * 
 * @name  POST /api/v1/tasks/add
 * @summary Add a task.
 * @param {String} path - Express path
 * @param {callback} validate - Middleware that verifies task params 
 * 
 * @api {post} /api/v1/tasks/add Add a task
 * @apiName AddTask
 * @apiGroup Task
 * @apiParam (Request body) {String}
 */
router.post('/add', validate([
    ...taskValidationRules,
    body('name').notEmpty().withMessage('name is a required field')
]), asyncHandler(async (req, res) => {
    const newTask = new Task({...req.body});
    const savedTask = await newTask.save();
    console.log(`Created ${newTask}`);
    res.status(STATUS_CREATED).json(savedTask);
}));

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
// export default router;
// Setup and HTTP status codes
// Task validation rules, error handling middleware, and async error handler