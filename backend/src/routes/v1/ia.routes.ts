import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { conversar } from '../../controllers/IAController';

const iaRoutes = Router();

iaRoutes.post('/', authMiddleware, conversar);

export default iaRoutes;
