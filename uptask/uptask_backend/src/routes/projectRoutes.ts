import { body, param } from 'express-validator';

import { ProjectController } from '../controllers/ProjectController';
import { Router } from 'express';
import { handleInputErrors } from '../middlewares/validation';

// BASE /api/projects
const router = Router();

router.post(
  '/',
  body('projectName')
    .notEmpty()
    .withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty()
    .withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty()
    .withMessage('La descripción del proyecto es obligatoria'),
  handleInputErrors,
  ProjectController.createProject
);

router.get('/', ProjectController.getAllProjects);

router.get(
  '/:id',
  param('id').isMongoId().withMessage('El id es inválido'),
  handleInputErrors,
  ProjectController.getProjectById
);

router.put(
  '/:id',
  param('id').isMongoId().withMessage('El id es inválido'),
  body('projectName')
    .notEmpty()
    .withMessage('El nombre del proyecto es obligatorio'),
  body('clientName')
    .notEmpty()
    .withMessage('El nombre del cliente es obligatorio'),
  body('description')
    .notEmpty()
    .withMessage('La descripción del proyecto es obligatoria'),  
  handleInputErrors,
  ProjectController.updateProject
);

router.delete(
  '/:id',
  param('id').isMongoId().withMessage('El id es inválido'),
  handleInputErrors,
  ProjectController.deleteProject
);

export default router;
