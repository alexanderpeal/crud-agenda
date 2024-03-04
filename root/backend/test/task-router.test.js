/**
 * Tests task-router.js
 */

require('dotenv').config({path: `./.test.env`});
const apiVersion = process.env.API_VERSION || 'v1';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const { connectDB, clearDB } = require('../src/config/database');

chai.use(chaiHttp);
const expect = chai.expect;

const ADD_TASK_ROUTE = `POST /api/${apiVersion}/tasks/add`;

describe('Global test setup', function() {
    before(function() {
        if (process.env.NODE_ENV !== 'test') {
            console.error("CRITICAL: NODE_ENV is not set to 'test'. Aborting");
            process.exit(1);
        }
    });
});

before(async () => {
    await connectDB();
});

afterEach(async () => {
    await clearDB();
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
});