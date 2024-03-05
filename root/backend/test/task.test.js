/**
 * Tests task.js
 */

require('dotenv').config({path: `./.test.env`});
const apiVersion = process.env.API_VERSION || 'v1';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const Task = require('../src/models/task'); // taskSchema } 

chai.use(chaiHttp);
const expect = chai.expect;

// beforeEach(async () => {
//     mongoServer = await MongoMemoryServer.create();
//     const mongoUri = mongoServer.getUri();
//     await mongoose.connect(mongoUri);
// });
  
// afterEach(async () => {
//     if (mongoose.connection.readyState) {
//         await mongoose.disconnect();
//     }
//     if (mongoServer) {
//         await mongoServer.stop();
//     }
// });

describe('mongoose schema: taskSchema', function() {
    it('Should set fields of the task correctly', async () => {
        // expect(taskSchema.status).to.exist;
    });
});

describe('mongoose model: Task', function() {
    it('Should create a new task', async () => {
        const testTask = new Task({
            name: "Test task name",
            description: "Test task description"
        })

        expect(testTask.name).to.equal("Test task name");
        
        // expect(testTask.status).to.equal("Incomplete");
    });
});