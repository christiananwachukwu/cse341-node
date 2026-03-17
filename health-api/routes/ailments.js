const express = require('express');
const router = express.Router();
const ailmentsController = require('../controllers/ailments');
const { body } = require('express-validator');

const ailmentValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('symptoms').notEmpty().withMessage('Symptoms are required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('causes').notEmpty().withMessage('Causes are required'),
  body('severity').notEmpty().withMessage('Severity is required'),
  body('contagious').isBoolean().withMessage('Contagious must be true or false'),
  body('treatment').notEmpty().withMessage('Treatment is required')
];

router.get('/', ailmentsController.getAll);
router.get('/:id', ailmentsController.getSingle);
router.post('/', ailmentValidation, ailmentsController.createAilment);
router.put('/:id', ailmentValidation, ailmentsController.updateAilment);
router.delete('/:id', ailmentsController.deleteAilment);

module.exports = router;