import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { verPerfil, atualizarPerfil, alterarSenha } from '../../controllers/PerfilController';

const perfilRoutes = Router();

perfilRoutes.use(authMiddleware);
perfilRoutes.get('/', verPerfil);
perfilRoutes.put('/', atualizarPerfil);
perfilRoutes.put('/senha', alterarSenha);

export default perfilRoutes;
