import { Router } from 'express';
import statusRoutes from './status';

const router = Router();

const services = [
  { path: 'status', route: statusRoutes },
];

services.forEach(({ path, route }) => {
  const routePath = `/api/${path}`;
  router.use(routePath, route);
});

export default router;
