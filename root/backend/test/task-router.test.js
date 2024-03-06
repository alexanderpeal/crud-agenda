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

global.before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

global.beforeEach(async () => {
    // Get all collections
    const collections = await mongoose.connection.db.collections();

    // Loop over the collections and drop each one
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});
  
global.after(async () => {
    if (mongoose.connection.readyState) {
        await mongoose.disconnect();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe(ADD_TASK_ROUTE, function() {
    it('Should create/return task when given valid task', async () => {
        const task = {
            name: 'Test task',
            description: 'Test description',
            deadline: '2030-01-01T00:00:00.000Z',
            status: 'Incomplete'
        };

        const res = await chai.request(app)
            .post('/api/v1/tasks/add')
            .send(task);
        
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal(task.name);
    });

    it('Should send bad status when given bad task', async () => {
        const taskNoName = {
            name: null,
            description: 'Test description',
            deadline: '2030-01-01T00:00:00.000Z',
            status: 'Incomplete'
        };

        const res = await chai.request(app)
            .post('/api/v1/tasks/add')
            .send(taskNoName);
        
        expect(res).to.have.status(400);
    });

    // Not sure how to test if server error middleware is used yet


    // it('Should throw an error when given unknown param in body', async () => {
    //     const taskBadBody = {
    //         name: "Test name",
    //         bad_property: null
    //     };

    //     const res = await chai.request(app)
    //         .post('/api/v1/tasks/add')
    //         .send(taskBadBody);
        
    //     expect(res).to.have.status(500);
    // });

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
            // const TEST_TIME_DELTA = 30; // Margin of error for time tests, in seconds
    //expect(testTask.createdAt).to.be.closeToTime(new Date(), TEST_TIME_DELTA);
        //expect(testTask.updatedAt).to.be.closeToTime(new Date(), TEST_TIME_DELTA);
});