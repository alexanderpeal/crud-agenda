/**
 * Tests task.js.
 */

require('dotenv').config({path: `./.test.env`});

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiDateTime = require('chai-datetime');
const mongoose = require('mongoose');

const TASK_INCOMPLETE = "Incomplete";
const TASK_IN_PROGRESS = "In Progress"
const TASK_COMPLETE = "Complete";

const Task = require('../src/models/task');

chai.use(chaiHttp);
chai.use(chaiDateTime);
const expect = chai.expect;

describe('Task - mongoose model', function() {
    it("Should be named 'Task'", function () {
        expect(mongoose.modelNames()).to.eql(["Task"]);
    });

    it('Should have all the right properties', function () {
        // expect(Task.name)
    })

    it('Should create task when given all (valid) args', function () {
        const TEST_NAME = "Test task name";
        const TEST_DESC = "Test task description";
        const TEST_DATE = "2030-01-01T00:00:00.000Z";

        const testTaskValid = new Task({
            name: TEST_NAME,
            description: TEST_DESC,
            deadline: TEST_DATE,
            status: TASK_INCOMPLETE
        });

        error = testTaskValid.validateSync();
        expect(error).to.be.undefined;
        expect(testTaskValid.name).to.equal(TEST_NAME);
        expect(testTaskValid.description).to.equal(TEST_DESC);
        expect(testTaskValid.deadline.toISOString()).to.equal(TEST_DATE);
        expect(testTaskValid.status).to.equal(TASK_INCOMPLETE);
        expect(testTaskValid.createdAt).to.be.undefined;
        expect(testTaskValid.updatedAt).to.be.undefined;
    });

    /**
     * Test that a task created with no args doesn't work. `name` is a required
     * field, so it should lead to an appropiate error message. `description`
     * and `deadline` are not required. A default value should be provided for
     * `status`.
     */
    it('Should not create a new task when given no args', function () {
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

    it("Should create task when given status = ['Complete', 'Incomplete', 'In Progress']", function () {
        const TEST_NAME = "Test task name";

        const testTaskStatusIncomplete = new Task({
            name: TEST_NAME,
            status: TASK_INCOMPLETE
        });
        error = testTaskStatusIncomplete.validateSync();
        expect(error).to.be.undefined;
        expect(testTaskStatusIncomplete.status).to.equal(TASK_INCOMPLETE);

        const testTaskStatusInProgress = new Task({
            name: TEST_NAME,
            status: TASK_IN_PROGRESS
        });
        error = testTaskStatusInProgress.validateSync();
        expect(error).to.be.undefined;
        expect(testTaskStatusInProgress.status).to.equal(TASK_IN_PROGRESS);

        const testTaskStatusComplete = new Task({
            name: TEST_NAME,
            status: TASK_COMPLETE
        });
        error = testTaskStatusComplete.validateSync();
        expect(error).to.be.undefined;
        expect(testTaskStatusComplete.status).to.equal(TASK_COMPLETE);
    });

    it("Should not create a task when given an invalid string for status", function () {
        const TEST_NAME = "Test task name";
        const STATUS_ENUM_MSG = "`Not a valid status` is not a valid enum value for path `status`.";

        const testTaskStatusInvalid = new Task({
            name: TEST_NAME,
            status: "Not a valid status"
        });
        expect(testTaskStatusInvalid.status).to.eql("Not a valid status");

        error = testTaskStatusInvalid.validateSync();
        expect(error).to.be.an.instanceOf(mongoose.Error.ValidationError);
        expect(error.errors).to.have.property("status");
        expect(error.errors.status.message).to.equal(STATUS_ENUM_MSG);
        
    });

    it('Should not create a new task when given bad name', function () {
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