const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'This is the API for all routes associated with contacts'
  },
  host: 'cse321-w1-project.onrender.com/',
  schemes: ['https']
};

const outputFile = './swagger-output.json';
const routes = [ './routes/index.js'];

swaggerAutogen(outputFile, routes, doc)