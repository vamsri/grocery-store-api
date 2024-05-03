const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',  // OpenAPI version
    info: {
      title: 'Node.js API',
      version: '1.0.0',
      description: 'A simple Express Node.js API',
    },
    servers: [
      {
        url: 'http://localhost:4001',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'],  // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs
