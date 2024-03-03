
require('dotenv').config({path: `./.env`});
const apiVersion = process.env.API_VERSION || 'v1';

//const chai = require('chai');
import chai from 'chai';


const chaiHttp = require('chai-http');
const server = require(`./src/v1/routes.task-router`);

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Tests', function() {
    done();
});