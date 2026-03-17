const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('medicines').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const medicineId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('medicines').findOne({ _id: medicineId });
    if (!result) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createMedicine = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const medicine = {
      name: req.body.name,
      dosage: req.body.dosage,
      manufacturer: req.body.manufacturer,
      sideEffects: req.body.sideEffects,
      price: req.body.price,
      prescription: req.body.prescription,
      category: req.body.category,
      description: req.body.description
    };
    const result = await mongodb.getDb().collection('medicines').insertOne(medicine);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateMedicine = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const medicineId = new ObjectId(req.params.id);
    const medicine = {
      name: req.body.name,
      dosage: req.body.dosage,
      manufacturer: req.body.manufacturer,
      sideEffects: req.body.sideEffects,
      price: req.body.price,
      prescription: req.body.prescription,
      category: req.body.category,
      description: req.body.description
    };
    const result = await mongodb
      .getDb()
      .collection('medicines')
      .replaceOne({ _id: medicineId }, medicine);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json({ message: 'Medicine updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const medicineId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .collection('medicines')
      .deleteOne({ _id: medicineId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMedicine,
  updateMedicine,
  deleteMedicine
};