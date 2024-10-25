import { Request, Response } from 'express';

import Product from '../models/Product.model';

// import { check, validationResult } from 'express-validator';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [['id', 'DESC']],
      attributes: { exclude: ['updatedAt', 'createdAt'] },
    });
    res.json({ msg: 'Obtener productos', data: products });
  } catch (error) {
    console.log(error);
    res.json({ msg: 'Hubo un error al obtener los productos' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    res.json({ msg: `Obtener producto ${id}`, data: product });
    return;
  } catch (error) {
    console.log(error);
    res.json({ msg: 'Hubo un error al obtener los productos' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  /*
  // Validación dentro del controlador
    await check('name')
      .notEmpty()
      .withMessage('El nombre del producto no puede ser vacio')
      .run(req);

    await check('price')
      .notEmpty()
      .withMessage('El precio del producto no puede ser vacio')
      .isNumeric()
      .withMessage('El precio no es válido')
      .custom((value) => value > 0)
      .withMessage('El precio debe ser positivo')
      .run(req);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  */

  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      msg: 'producto guardado correctamente',
      data: { product },
    });
    return;
  } catch (error) {
    console.log(error);
    res.json({ msg: 'Hubo un error al crear el producto' });
    return;
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    // Actualizar
    await product.update(req.body);
    await product.save();

    res.json({ msg: `Actualizar producto ${id}`, data: product });
  } catch (error) {
    console.log(error);
    res.json({ msg: 'Hubo un error al obtener los productos' });
  }
};

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    // Actualizar
    product.availability = !product.dataValues.availability;
    await product.save();

    res.json({
      msg: `Actualizar disponibilidad de producto ${id}`,
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.json({
      msg: 'Hubo un error al actualizar la disponibilidad del producto',
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    await product.destroy();
    res.json({ msg: 'Producto eliminado' });
    return;
  } catch (error) {
    console.log(error);
    res.json({
      msg: 'Hubo un error al eliminar el producto',
    });
    return;
  }
};
