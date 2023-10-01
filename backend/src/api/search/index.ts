import { Router } from 'express';
import searchController from './search.controller';

const router = Router({ mergeParams: true });

router.get('/', searchController.search);
router.get('/v2', searchController.searchV2);

export default router;
