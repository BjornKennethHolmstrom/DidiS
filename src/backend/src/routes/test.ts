import { Router } from 'express';
import db from '../config/database';

const router = Router();

router.get('/db-test', async (req, res) => {
  try {
    await db.raw('SELECT 1');
    res.json({ status: 'Database connection successful' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ 
      status: 'Database connection failed',
      error: error.message 
    });
  }
});

export default router;
