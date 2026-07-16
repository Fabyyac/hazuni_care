import { Router } from 'express';
import authRoutes from './v1/auth.routes';
import perfilRoutes from './v1/perfil.routes';
import agendaRoutes from './v1/agenda.routes';
import medicamentoRoutes from './v1/medicamento.routes';
import documentoRoutes from './v1/documento.routes';
import notificacaoRoutes from './v1/notificacao.routes';
import iaRoutes from './v1/ia.routes';

const routes = Router();
routes.use('/api/v1/auth', authRoutes);
routes.use('/api/v1/perfil', perfilRoutes);
routes.use('/api/v1/agenda', agendaRoutes);
routes.use('/api/v1/medicamentos', medicamentoRoutes);
routes.use('/api/v1/documentos', documentoRoutes);
routes.use('/api/v1/notificacoes', notificacaoRoutes);
routes.use('/api/v1/ia', iaRoutes);

export default routes;