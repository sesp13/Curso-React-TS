import colors from 'colors';
import db from './config/db';
import express from 'express';
import productsRouter from './router';
import swaggerSpec from './config/swagger';
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

// Habilitar lectura de json
server.use(express.json());

// Routing
server.use('/api/products', productsRouter);

/*
server.get('/api', (req, res) => {
  res.json({ msg: 'Desde API' });
});
*/

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
