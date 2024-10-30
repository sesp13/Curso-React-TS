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

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Creates a new product
 *    tags:
 *      - Products
 *    description: Returns a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Monitor Curvo 49 Pulgadas"
 *             price:
 *               type: number
 *               example: 399
 *    responses:
 *      201:
 *        description: Susccesful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request invalid input data
 *
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Updates a product with user input
 *    tags:
 *      - Products
 *    description: Returns the updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retreive
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Monitor Curvo 49 Pulgadas"
 *             price:
 *               type: number
 *               example: 399
 *             availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      200:
 *        description: Susccesful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid ID or Invalid Input Data
 *      404:
 *        description: Product not found
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update product availability
 *    tags: 
 *      - Products
 *    description: Returns the updated availability
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retreive
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Susccesful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Product not found
 *     
 */
router.patch(
  '/:id',
  param('id').isInt().withMessage('id no válido'),
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Deletes a product by a given ID
 *    tags:
 *      - Products
 *    description: Returns a confirmation message
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to delete
 *      required: true
 *      schema:
 *        type: integer    
 *    responses:
 *      200:
 *        description: The product was deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: 'Producto eliminado'
 *      400:
 *        description: Bad request - Invalid ID
 *      404:
 *        description: Product not found
 */
router.delete(
  '/:id',
  param('id').isInt().withMessage('id no válido'),
  handleInputErrors,
  deleteProduct
);

export default router;
