import { Router } from 'express';
import statusController from './status.controller';

const router = Router({ mergeParams: true });

router.get('/', statusController.status);

export default router;
