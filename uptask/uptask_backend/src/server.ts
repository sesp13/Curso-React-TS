import express, { json } from 'express';

import { config } from 'dotenv';
import { connectDB } from './config/db';
import projectRoutes from './routes/projectRoutes';

config();

connectDB();

const app = express();

app.use(json());

// Routes
app.use('/api/projects', projectRoutes);

export default app;
