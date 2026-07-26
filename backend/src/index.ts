import 'dotenv/config';
import express from 'express';
import cors from 'express-cors';
import 'express-async-errors';
import { AppDataSource } from './db/data-source';
import logger from './utils/logger';

// Routes
import disabilityRoutes from './routes/disabilities';
import interventionRoutes from './routes/interventions';
import resourceRoutes from './routes/resources';
import searchRoutes from './routes/search';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/v1/disabilities', disabilityRoutes);
app.use('/api/v1/interventions', interventionRoutes);
app.use('/api/v1/resources', resourceRoutes);
app.use('/api/v1/search', searchRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

// Initialize database and start server
AppDataSource.initialize()
  .then(() => {
    logger.info('Database connected successfully');
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Failed to initialize database:', error);
    process.exit(1);
  });

export default app;
