import cors, { CorsOptions } from 'cors';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';

import colors from 'colors';
import db from './config/db';
import express from 'express';
import morgan from 'morgan';
import productsRouter from './router';
import swaggerUi from 'swagger-ui-express';

// Conectar a la base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    // console.log(colors.blue('Conexión exitosa a la base de datos'));
  } catch (error) {
    console.log(error);
    console.log(colors.red('Hubo un error al conectar a la base de datos'));
  }
}

connectDB();

const server = express();

// Permitir conexiones
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      // Permitir conexión
      callback(null, true);
    } else {
      callback(new Error('Error de CORS'));
    }
  },
};

server.use(cors(corsOptions));

// Habilitar lectura de json
server.use(express.json());

// Logs con Morgan
server.use(morgan('dev'));

// Routing
server.use('/api/products', productsRouter);

/*
server.get('/api', (req, res) => {
  res.json({ msg: 'Desde API' });
});
*/

// Docs
server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;
