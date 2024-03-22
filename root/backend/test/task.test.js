/**
 * Tests the contents of `task.js`, which primarily consist of the Task mongoose
 * model.
 */

require('dotenv').config({path: `./.test.env`});

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiDateTime = require('chai-datetime');
const mongoose = require('mongoose');

const TASK_NAME = "Test name";
const TASK_DESC = "Test description";
const TASK_DATE = "2030-01-01T00:00:00.000Z";

const TASK_INCOMPLETE = "Incomplete";
const TASK_IN_PROGRESS = "In Progress"
const TASK_COMPLETE = "Complete";

const TASK_NAME_TRIM_BOTH = "  Test name  ";

const Task = require('../src/models/task');

chai.use(chaiHttp);
chai.use(chaiDateTime);
const expect = chai.expect;

/**
 * Define tests for the Task mongoose model.
 */
describe('Task mongoose model', function() {
    /**
     * Verify that the model name is indeed 'Task'.
     */
    it("Should be named 'Task'", function () {
        expect(mongoose.modelNames()).to.eql(["Task"]);
    });

    /**
     * Test that a Task can be successfully made with all args passed and
     * containing legal values.
     */
    it('Should successfully create task when given valid args', function () {
        const testTaskValid = new Task({
            name: TASK_NAME,
            description: TASK_DESC,
            deadline: TASK_DATE,
            status: TASK_INCOMPLETE
        });

        error = testTaskValid.validateSync();
        expect(error).to.be.undefined;
        expect(testTaskValid.name).to.equal(TASK_NAME);
        expect(testTaskValid.description).to.equal(TASK_DESC);
        expect(testTaskValid.deadline.toISOString()).to.equal(TASK_DATE);
        expect(testTaskValid.status).to.equal(TASK_INCOMPLETE);
        expect(testTaskValid.createdAt).to.be.undefined;
        expect(testTaskValid.updatedAt).to.be.undefined;
    });

    /**
     * Test that a task created with no args doesn't work. `name` is a required
     * field, so it should lead to an appropiate error message. `description`
     * and `deadline` are not required. A default value should be provided by
     * the model for `status`.
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

    /**
     * Test that Task can successfully set all three types of status.
     */
    it("Should create task when given status = ['Complete', 'Incomplete', 'In Progress']", function () {
        const testTaskStatusIncomplete = new Task({
            name: TASK_NAME,
            status: TASK_INCOMPLETE
        });
        error = testTaskStatusIncomplete.validateSync();
        expect(error).to.be.undefined;
        expect(testTaskStatusIncomplete.status).to.equal(TASK_INCOMPLETE);

        const testTaskStatusInProgress = new Task({
            name: TASK_NAME,
            status: TASK_IN_PROGRESS
        });
        error = testTaskStatusInProgress.validateSync();
        expect(error).to.be.undefined;
        expect(testTaskStatusInProgress.status).to.equal(TASK_IN_PROGRESS);

        const testTaskStatusComplete = new Task({
            name: TASK_NAME,
            status: TASK_COMPLETE
        });
        error = testTaskStatusComplete.validateSync();
        expect(error).to.be.undefined;
        expect(testTaskStatusComplete.status).to.equal(TASK_COMPLETE);
    });

    /**
     * If a value besides `['Complete', 'Incomplete', 'In Progress']` is provided
     * for the `status` field, then the Task should throw a `ValidationError`
     * when being validated.
     */
    it("Should not create a task when given an invalid string for status", function () {
        const STATUS_ENUM_MSG = "`Not a valid status` is not a valid enum value for path `status`.";

        const testTaskStatusInvalid = new Task({
            name: TASK_NAME,
            status: "Not a valid status"
        });
        expect(testTaskStatusInvalid.status).to.eql("Not a valid status");

        error = testTaskStatusInvalid.validateSync();
        expect(error).to.be.an.instanceOf(mongoose.Error.ValidationError);
        expect(error.errors).to.have.property("status");
        expect(error.errors.status.message).to.equal(STATUS_ENUM_MSG);
        
    });

    /**
     * If an illegal value (e.g. not a string) value is passed to the name
     * field, 
     */
    it('Should not create a new task when given bad name', function () {
        const testTaskBadName = new Task({
            name: null,
            status: TASK_INCOMPLETE
        });
        expect(testTaskBadName.name).to.eql(null);

        error = testTaskBadName.validateSync();

        // TODO: fix me
        testTaskBadName.validate(function(err) {
            expect(err.errors.name).to.exist();
        })
    });

    /**
     * Test that the name trims whitespace properly.
     */
    it('Should trim whitespace from the name field', function () {
        const testTaskNameTrimBothSides = new Task({
            name: TASK_NAME_TRIM_BOTH,
            status: TASK_INCOMPLETE
        });
        expect(testTaskNameTrimBothSides.name).to.eql(TASK_NAME_TRIM_BOTH);

        error = testTaskNameTrimBothSides.validateSync();
        expect(testTaskNameTrimBothSides.name).to.eql(TASK_NAME);

        // add for "  Trim Test" and "Trim Test  "... NameTrimLeftSide, NameTrimRightSide
    });

    /**
     * Test that the description trims whitespace properly.
     */
});