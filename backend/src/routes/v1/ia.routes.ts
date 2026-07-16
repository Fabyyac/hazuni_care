import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { conversar } from '../../controllers/IAController';

const iaRoutes = Router();

// Protected route used by the frontend
iaRoutes.post('/', authMiddleware, conversar);

// Temporary public route for debugging (no auth) — remove in production
iaRoutes.post('/test', conversar);

export default iaRoutes;
