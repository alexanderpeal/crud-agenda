/**
 * Tests task-router.js
 */
const chai = require('chai');
const chaiHttp = require('chai-http');

require('dotenv').config({path: `./.env`});
const apiVersion = process.env.API_VERSION || 'v1';

let server;

async function loadModule(dynamicallyGeneratedPath) {
    try {
        server = await import(dynamicallyGeneratedPath);
        // Use the imported module
        console.log(server);
    } catch (error) {
        console.error('Failed to load the module:', error);
    }
}

const moduleName = 'example';
const modulePath = `./path/to/${moduleName}.js`;

const SERVER_PATH = '../index'; // api/${apiVersion}/routes/task-router`;
// loadModule(SERVER_PATH);
// import server from SERVER_PATH;

chai.use(chaiHttp);
const expect = chai.expect;

const POST_ROUTE = `POST /api/${apiVersion}/tasks/add`;

const app = require('../index');

describe(POST_ROUTE, function() {
    // before(async () => {
    //     await loadModule(SERVER_PATH);
    // });
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

            // .end((err, res) => {
            //     expect(err).to.be.null;
            //     expect(res.body).to.be.an('object');
            //     done();
            // });
        
        expect(res).to.have.status(201);

        expect(res.body).to.be.an('object');
        expect(res.body.name).to.equal(task.name);
    });
});