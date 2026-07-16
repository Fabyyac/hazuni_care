import { Router } from 'express';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { listarDocumentos, criarDocumento, excluirDocumento } from '../../controllers/DocumentoController';

const documentoRoutes = Router();
documentoRoutes.use(authMiddleware);
documentoRoutes.get('/', listarDocumentos);
documentoRoutes.post('/', criarDocumento);
documentoRoutes.delete('/:id', excluirDocumento);

export default documentoRoutes;