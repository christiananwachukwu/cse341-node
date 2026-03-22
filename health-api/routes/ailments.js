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

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'You must be logged in to perform this action'});
};

router.get('/', ailmentsController.getAll);
router.get('/:id', ailmentsController.getSingle);
router.post('/', isAuthenticated, ailmentValidation, ailmentsController.createAilment);
router.put('/:id', isAuthenticated, ailmentValidation, ailmentsController.updateAilment);
router.delete('/:id', isAuthenticated, ailmentsController.deleteAilment);

module.exports = router;