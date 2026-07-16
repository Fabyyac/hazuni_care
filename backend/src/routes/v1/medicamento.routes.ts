import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { listarMedicamentos, criarMedicamento, atualizarMedicamento, excluirMedicamento } from '../../controllers/MedicamentoController';

const medicamentoRoutes = Router();
medicamentoRoutes.use(authMiddleware);
medicamentoRoutes.get('/', listarMedicamentos);
medicamentoRoutes.post('/', criarMedicamento);
medicamentoRoutes.put('/:id', atualizarMedicamento);
medicamentoRoutes.delete('/:id', excluirMedicamento);

export default medicamentoRoutes;