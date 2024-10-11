const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contacts API',
            version: '1.0.0',
            description: 'API for managing contacts',
        },
        servers: [
            {
                url: 'http://localhost:8080/', 
            },
        ],
    },
    apis: ['./routes/*.js'],  // Pointing to route files for Swagger annotations
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};