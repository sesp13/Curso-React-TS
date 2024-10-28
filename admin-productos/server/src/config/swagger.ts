import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.2',
    tags: [
      {
        name: 'Products',
        description: 'API operations related with products',
      },
    ],
    info: {
      title: 'Rest API node / express / typescript',
      version: '1.0.0',
      description: 'API docs for Products',
    },
  },
  apis: ['./src/router.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
