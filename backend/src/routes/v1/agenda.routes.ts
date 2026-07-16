import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { listarAgenda, criarEvento, atualizarEvento, excluirEvento } from '../../controllers/AgendaController';

const agendaRoutes = Router();
agendaRoutes.use(authMiddleware);
agendaRoutes.get('/', listarAgenda);
agendaRoutes.post('/', criarEvento);
agendaRoutes.put('/:id', atualizarEvento);
agendaRoutes.delete('/:id', excluirEvento);

export default agendaRoutes;