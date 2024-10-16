import db from './config/db';
import express from 'express';
import productsRouter from './router';

// Conectar a la base de datos
async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.log(error);
    console.log('Hubo un error al conectar a la base de datos');
  }
}

connectDB();

const server = express();

// Routing
server.use('/api/products', productsRouter);

export default server;
