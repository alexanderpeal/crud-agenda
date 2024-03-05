/**
 * Tests task.js.
 */

require('dotenv').config({path: `./.test.env`});
const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiDateTime = require('chai-datetime');
const mongoose = require('mongoose');

const TASK_INCOMPLETE = "Incomplete";

const Task = require('../src/models/task'); // taskSchema } 

chai.use(chaiHttp);
chai.use(chaiDateTime);
const expect = chai.expect;

describe('taskSchema - mongoose schema', function() {
    
});

describe('Task - mongoose model', function() {
    it('Should create a new task when given all args', async () => {
        const TEST_NAME = "Test task name";
        const TEST_DESC = "Test task description";
        const TEST_DATE = "2030-01-01T00:00:00.000Z";
        const TEST_TIME_DELTA = 30; // Margin of error for time tests, in seconds

        const testTask = new Task({
            name: TEST_NAME,
            description: TEST_DESC,
            deadline: TEST_DATE,
            status: TASK_INCOMPLETE
        });

        expect(testTask.name).to.equal(TEST_NAME);
        expect(testTask.description).to.equal(TEST_DESC);
        expect(testTask.deadline.toISOString()).to.equal(TEST_DATE);
        expect(testTask.status).to.equal(TASK_INCOMPLETE);
        expect(testTask.created_at).to.be.closeToTime(new Date(), TEST_TIME_DELTA);
        expect(testTask.updated_at).to.be.closeToTime(new Date(), TEST_TIME_DELTA);
    });

    /**
     * Test that a task created with no args doesn't work. `name` is a required
     * field, so it should lead to an appropiate error message. `description`
     * and `deadline` are not required. A default value should be provided for
     * `status`.
     */
    it('Should not create a new task when given no args', async () => {
        const NAME_REQUIRED_MSG = "name is a required field";

        const testTask = new Task({});

        error = testTask.validateSync();
        
        expect(error).to.be.an.instanceOf(mongoose.Error.ValidationError);
        expect(error.errors).to.have.property("name");

        expect(error.errors.name.message).to.equal(NAME_REQUIRED_MSG);
        expect(error.errors.description).to.be.undefined;
        expect(error.errors.deadline).to.be.undefined;
        expect(error.errors.status).to.be.undefined;

        expect(testTask.name).to.be.undefined;
        expect(testTask.description).to.be.undefined;
        expect(testTask.deadline).to.be.undefined;
        expect(testTask.status).to.be.equal(TASK_INCOMPLETE);
    });

    it('Should not create a new task when given bad name', async () => {
        const TEST_STATUS = "Incomplete";

        const testTask = new Task({
            name: null,
            status: TEST_STATUS
        });

        testTask.validate(function(err) {
            expect(err.errors.name).to.exist();
        })
    });
});