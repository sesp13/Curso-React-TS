import colors from 'colors';
import db from './config/db';
import express from 'express';
import productsRouter from './router';

// Conectar a la base de datos
async function connectDB() {
  try {
    await db.authenticate();
    await db.sync();
    console.log(colors.blue('Conexión exitosa a la base de datos'));
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

export default server;
