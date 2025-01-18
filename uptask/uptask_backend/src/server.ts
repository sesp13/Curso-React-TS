import express, { json } from 'express';

import { config } from 'dotenv';
import cors from 'cors';
import { corsConfig } from './config/cors';
import { connectDB } from './config/db';
import projectRoutes from './routes/projectRoutes';
import authRoutes from './routes/authRoutes';
import morgan from 'morgan';

config();

connectDB();

const app = express();

// Handle del CORS
app.use(cors(corsConfig));

//Logs
app.use(morgan('dev'));

// Enable json reading from requests
app.use(json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

export default app;
