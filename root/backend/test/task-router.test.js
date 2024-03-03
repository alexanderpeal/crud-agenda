// require('dotenv').config({path: `./.env`});
// const chai = require('chai');
// const chaiHttp = require('chai-http');

// import * as chai from 'chai';
// import chaiHttp from 'chai-http';
// import "dotenv/config.js";

const chai = await import('chai');

const apiVersion = process.env.API_VERSION || 'v1';

async function loadModule(dynamicallyGeneratedPath) {
try {
const module = await import(dynamicallyGeneratedPath);
// Use the imported module
console.log(module);
} catch (error) {
console.error('Failed to load the module:', error);
}
}
const moduleName = 'example';
const modulePath = `./path/to/${moduleName}.js`;



const SERVER_PATH = `./src/${apiVersion}/routes.task-router.js`
loadModule(SERVER_PATH);
//import server from SERVER_PATH;



chai.use(chaiHttp);
const expect = chai.expect;

const POST_ROUTE = `POST /api/${apiVersion}/tasks/add`;

describe(POST_ROUTE, function() {
    it('should create a new task and return it', (done) => {
        const task = {
            name: 'Test task',
            description: 'Test description',
            deadline: '2030-01-01T00:00:00.000Z',
            status: 'Incomplete'
        }

        chai.request(server)
            .post('/api/v1/tasks/add')
            .send(task)
            .end((err, res) => {
                expect(err).to.be.null;
                done();
            });
    });
});