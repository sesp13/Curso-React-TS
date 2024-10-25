import Product from '../models/Product.model';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL, {
  // Sincronizar los modelos de la base de datos
  models: [Product],
  logging: false
});

export default db;
