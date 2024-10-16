import { Router } from 'express';

const router = Router();

// Base /api/products

router.get('/', (req, res) => {
  res.json({ msg: 'HOLA' });
});


export default router;