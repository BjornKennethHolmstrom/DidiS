import { Router } from 'express';
import testRoutes from './test';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'DidiS API' });
});

router.use('/test', testRoutes);

export default router;
