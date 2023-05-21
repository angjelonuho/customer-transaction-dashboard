const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dashboard API Docs',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'], // Path to your API route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;