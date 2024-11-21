import { config } from 'dotenv';
import { connectDB } from './config/db';
import express from 'express';

config();

connectDB();

const app = express();

export default app;
