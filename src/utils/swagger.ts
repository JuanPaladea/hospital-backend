import path from 'path';

export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hospital API",
      version: "1.0.0",
      description: "Hospital Studies API in TypeScript",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, '../../docs/*.yaml')],
};