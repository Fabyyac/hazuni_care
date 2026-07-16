import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { listarNotificacoes, criarNotificacao, marcarComoLida } from '../../controllers/NotificacaoController';

const notificacaoRoutes = Router();
notificacaoRoutes.use(authMiddleware);
notificacaoRoutes.get('/', listarNotificacoes);
notificacaoRoutes.post('/', criarNotificacao);
notificacaoRoutes.put('/:id/lida', marcarComoLida);

export default notificacaoRoutes;