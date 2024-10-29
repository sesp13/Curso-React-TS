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

// Base /api/products
const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties: 
 *        id: 
 *          type: integer
 *          description: The product ID
 *          example: 1
 *        name: 
 *          type: string
 *          description: The product name
 *          example: Monitor curvo de 49 pulgadas
 *        price: 
 *          type: number
 *          description: The product price
 *          example: 300
 *        availability: 
 *          type: boolean
 *          description: The product availability
 *          example: true
 */



/**
 * @swagger
 * /api/products:
 *  get: 
 *    summary: Get a list of products
 *    tags: 
 *      - Products
 *    description: Return a list of products
 *    responses: 
 *      200: 
 *        description: Succesful response
 *        content: 
 *          application/json:
 *            schema: 
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Return a product based on it's unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retreive
 *      required: true
 *      schema:
 *        type: integer
 *    responses: 
 *      200:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema: 
 *              $ref: '#/components/schemas/Product'
 *      404:
 *        description: Not Found
 *      400:
 *        description: Bad request, invalid ID
 * 
 */
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
  handleInputErrors,
  deleteProduct
);

export default router;
