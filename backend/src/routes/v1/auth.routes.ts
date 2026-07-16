import { Router } from 'express';
import { login, cadastrar } from '../../controllers/AuthController';

const authRoutes = Router();

authRoutes.post('/cadastro', cadastrar);
authRoutes.post('/login', login);

export default authRoutes;