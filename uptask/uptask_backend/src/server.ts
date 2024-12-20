import express, { json } from 'express';

import { config } from 'dotenv';
import cors from 'cors';
import { corsConfig } from './config/cors';
import { connectDB } from './config/db';
import projectRoutes from './routes/projectRoutes';

config();

connectDB();

const app = express();

// Handle del CORS
app.use(cors(corsConfig));

app.use(json());

// Routes
app.use('/api/projects', projectRoutes);

export default app;
