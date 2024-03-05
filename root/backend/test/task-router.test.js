/**
 * Tests task-router.js
 */

require('dotenv').config({path: `./.test.env`});
const apiVersion = process.env.API_VERSION || 'v1';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

chai.use(chaiHttp);
const expect = chai.expect;

const ADD_TASK_ROUTE = `POST /api/${apiVersion}/tasks/add`;

global.beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});
  
global.afterEach(async () => {
    if (mongoose.connection.readyState) {
        await mongoose.disconnect();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe(ADD_TASK_ROUTE, function() {
    it('should create a new task and return it', async () => {
        const task = {
            name: 'Test task',
            description: 'Test description',
            deadline: '2030-01-01T00:00:00.000Z',
            status: 'Incomplete'
        }

        const res = await chai.request(app)
            .post('/api/v1/tasks/add')
            .send(task);
        
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal(task.name);
    });

    // it('should throw an error', async () => {
    //     const bad_task = {
    //         name: false,
    //         description: false
    //     }
    //     var err = false;
    //     try {
    //         const res = await chai.request(app)
    //         .post('api/v1/tasks/add')
    //         .send(bad_task);
    //     } catch (error) {
    //         err = True;
    //         expect(error).to.exist();
    //     } finally {
    //         if (!err) {
    //             throw new Error();
    //         }
    //     }
        
    // });
});

after(async () => {
    await mongoServer.stop();
})