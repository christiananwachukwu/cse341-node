const express = require('express');
const router = express.Router();
const medicinesController = require('../controllers/medicines');
const { body } = require('express-validator');

const medicineValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('dosage').notEmpty().withMessage('Dosage is required'),
  body('manufacturer').notEmpty().withMessage('Manufacturer is required'),
  body('sideEffects').notEmpty().withMessage('Side effects are required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('prescription').isBoolean().withMessage('Prescription must be true or false'),
  body('category').notEmpty().withMessage('Category is required'),
  body('description').notEmpty().withMessage('Description is required')
];

router.get('/', medicinesController.getAll);
router.get('/:id', medicinesController.getSingle);
router.post('/', medicineValidation, medicinesController.createMedicine);
router.put('/:id', medicineValidation, medicinesController.updateMedicine);
router.delete('/:id', medicinesController.deleteMedicine);

module.exports = router;