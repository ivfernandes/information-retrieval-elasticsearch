import { Router } from 'express';
import statusRoutes from './status';
import searchRoutes from './search';

const router = Router();

const services = [
  { path: 'status', route: statusRoutes },
  { path: 'search', route: searchRoutes },
];

services.forEach(({ path, route }) => {
  const routePath = `/api/${path}`;
  router.use(routePath, route);
});

export default router;
