import { SwaggerUiOptions } from 'swagger-ui-express';
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

export const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `
    .topbar-wrapper .link {
      content: url('https://codigoconjuan.com/wp-content/themes/cursosjuan/img/logo.svg');
      height: 80px;
      width: auto;
    }
    .swagger-ui .topbar {
      background-color: #2b3b45;
    }
  `,
  customSiteTitle: 'Documentación Rest API Express / Typescript'
}

export default swaggerSpec;
