/**
 * Tests the contents of `task.js`, which consists of the Task mongoose model.
 * 
 * @since 2024-03-22
 * @author Alexander Peal
 */

require('dotenv').config({path: `./.test.env`});

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiDateTime = require('chai-datetime');
const mongoose = require('mongoose');

// Constants used for testing.
const TASK_NAME = "Test name";
const TASK_DESC = "Test description";
const TASK_DATE = "2030-01-01T00:00:00.000Z";
const TASK_INCOMPLETE = "Incomplete";
const TASK_IN_PROGRESS = "In Progress"
const TASK_COMPLETE = "Complete";
const TASK_NAME_TRIM_BOTH = "  Test name  ";
const TASK_NAME_TRIM_LEFT = "  Test name";
const TASK_NAME_TRIM_RIGHT = "Test name  ";
const TASK_DESC_TRIM_BOTH = "  Test description  ";
const TASK_DESC_TRIM_LEFT = "  Test description";
const TASK_DESC_TRIM_RIGHT = "Test description  ";
const STATUS_ENUM_MSG = "`Not a valid status` is not a valid enum value for path `status`.";


const Task = require('../src/models/task');

chai.use(chaiHttp);
chai.use(chaiDateTime);
const expect = chai.expect;

/**
 * Define tests for the Task mongoose model.
 */
describe('Task mongoose model', function() {
    /**
     * Test that the model name is indeed 'Task'.
     */
    it("Should have model name 'Task'", function () {
        expect(mongoose.modelNames()).to.eql(["Task"]);
    });

    /**
     * Test that a Task gets created if:
     * - All args are included
     * - All args contain legal values
     */
    it('Should create task when given good args', function () {
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
     * Test that a task created with no args doesn't work.
     * - `name` is a required field, so it should lead to an appropiate error
     *   message. `description`
     * - `deadline` is not required.
     * - `status` is not required, and provided a default value of "Incomplete".
     */
    it('Should not create task when given no args', function () {
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
     * Test that a task gets created if a valid status is provided.
     * Specifically, test that values of 'Complete', 'Incomplete', and 
     * 'In Progress' work for status.
     */
    it("Should create task when given good status ('Complete', 'Incomplete', 'In Progress')", function () {
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
     * Test that a task name with extra whitespace is trimmed properly. After
     * being created, the task should automatially adjust the name field.
     */
    it('Should trim whitespace from the name field', function () {
        const testTaskNameTrimBothSides = new Task({
            name: TASK_NAME_TRIM_BOTH,
            status: TASK_INCOMPLETE
        });
        expect(testTaskNameTrimBothSides.name).to.eql(TASK_NAME);
        error = testTaskNameTrimBothSides.validateSync();
        expect(error).to.be.undefined;
        
        const testTaskNameTrimLeftSide = new Task({
            name: TASK_NAME_TRIM_LEFT,
            status: TASK_INCOMPLETE
        });
        expect(testTaskNameTrimLeftSide.name).to.eql(TASK_NAME);
        error = testTaskNameTrimLeftSide.validateSync();
        expect(error).to.be.undefined;

        const testTaskNameTrimRightSide = new Task({
            name: TASK_NAME_TRIM_RIGHT,
            status: TASK_INCOMPLETE
        });
        expect(testTaskNameTrimRightSide.name).to.eql(TASK_NAME);
        error = testTaskNameTrimRightSide.validateSync();
        expect(error).to.be.undefined;
    });

    /**
     * Test that a task description with extra whitespace is trimmed properly.
     * After being created, the task should automatically trim the description.
     */
    it('Should trim whitespace from the description field', function () {
        const testTaskDescTrimBothSides = new Task({
            name: TASK_NAME,
            description: TASK_DESC_TRIM_BOTH,
            status: TASK_INCOMPLETE
        });
        expect(testTaskDescTrimBothSides.description).to.eql(TASK_DESC);
        error = testTaskDescTrimBothSides.validateSync();
        expect(error).to.be.undefined;
        
        const testTaskDescTrimLeftSide = new Task({
            name: TASK_NAME,
            description: TASK_DESC_TRIM_LEFT,
            status: TASK_INCOMPLETE
        });
        expect(testTaskDescTrimLeftSide.description).to.eql(TASK_DESC);
        error = testTaskDescTrimLeftSide.validateSync();
        expect(error).to.be.undefined;

        const testTaskDescTrimRightSide = new Task({
            name: TASK_NAME,
            description: TASK_DESC_TRIM_RIGHT,
            status: TASK_INCOMPLETE
        });
        expect(testTaskDescTrimRightSide.description).to.eql(TASK_DESC);
        error = testTaskDescTrimRightSide.validateSync();
        expect(error).to.be.undefined;
    });

    /**
     * FIXME This is scuffed. ALso add validation of string length 100.
     * 
     * Current purpose:
     * Test that a task created with a non-string name populates the name with
     * the toString() representation of the non-string.
     * 
     * Old purpose:
     * Test that a task created with bad name doesn't work. If an illegal value
     * (e.g. not a string) value is passed to the name field, the task should
     * not validate.
     */
    it('Should not create task when given bad name', function () {
        const testTaskBadName = new Task({
            name: true,
            status: TASK_INCOMPLETE
        });
        console.log(testTaskBadName.name);
        expect(testTaskBadName.name).to.eql("true");
        error = testTaskBadName.validateSync();
        expect(error).to.be.undefined;
    });

    /**
     * FIXME ALso scuffed
     * 
     * Current purpose:
     * Tests that a task fails if the length exceeds 500 chars.
     * 
     * Old purpose:
     * Test that task should not validate if given a description that is:
     * - Not a string
     * - Length exceeds 500
     */
    it("Should not create task when given bad description", function () {
        const testTaskDescTooLong = new Task({
            name: TASK_NAME_TRIM_BOTH,
            description: new Array(1999).join("_")
        });

        error = testTaskDescTooLong.validateSync();
        expect(error).to.be.an.instanceOf(mongoose.Error.ValidationError);
    });

     /**
     * Test that a task given a status besides `['Complete', 'Incomplete', 
     * 'In Progress']` throws a `ValidationError` when being validated.
     */
     it("Should not create task when given bad status", function () {
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
     * TODO
     * 
     * Test that the task timestamps work as intended. Requires async operation
     * (https://mongoosejs.com/docs/timestamps.html), so I'll refrain from
     * testing it for now.
     */
});