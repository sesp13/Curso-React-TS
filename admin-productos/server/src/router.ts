import { body, param } from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from './handlers/product';

import { Router } from 'express';
import { handleInputErrors } from './middlewares';

const router = Router();

// Base /api/products

router.get('/', getProducts);

router.get(
  '/:id',
  param('id').isInt().withMessage('id no válido'),
  handleInputErrors,
  getProductById
);

router.post(
  '/',
  body('name')
    .notEmpty()
    .withMessage('El nombre del producto no puede ser vacio'),
  body('price')
    .notEmpty()
    .withMessage('El precio del producto no puede ser vacio')
    .isNumeric()
    .withMessage('El precio no es válido')
    .custom((value) => value > 0)
    .withMessage('El precio debe ser positivo'),
  handleInputErrors,
  createProduct
);

router.put(
  '/:id',
  param('id').isInt().withMessage('id no válido'),
  body('name')
    .notEmpty()
    .withMessage('El nombre del producto no puede ser vacio'),
  body('price')
    .notEmpty()
    .withMessage('El precio del producto no puede ser vacio')
    .isNumeric()
    .withMessage('El precio no es válido')
    .custom((value) => value > 0)
    .withMessage('El precio debe ser positivo'),
  body('availability')
    .isBoolean()
    .withMessage('El valor para disponibilidad no es válido'),
  handleInputErrors,
  updateProduct
);

router.patch(
  '/:id',
  param('id').isInt().withMessage('id no válido'),
  updateAvailability
);

router.delete(
  '/:id',
  param('id').isInt().withMessage('id no válido'),
  deleteProduct
);

export default router;
