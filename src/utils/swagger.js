const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { host, port } = require('../../config');

module.exports = (app) => {
  const swaggerDefinition = {
    info: {
      title: 'Code Challenge Grupo ZAP',
      version: '1.0.0',
    },
    host: `${host}:${port}`,
    basePath: '/',
  };

  const options = {
    swaggerDefinition,
    apis: ['./src/routes/**/*.js'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
