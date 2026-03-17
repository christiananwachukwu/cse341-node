const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('ailments').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const ailmentId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('ailments').findOne({ _id: ailmentId });
    if (!result) {
      return res.status(404).json({ message: 'Ailment not found' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAilment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const ailment = {
      name: req.body.name,
      symptoms: req.body.symptoms,
      description: req.body.description,
      causes: req.body.causes,
      severity: req.body.severity,
      contagious: req.body.contagious,
      treatment: req.body.treatment
    };
    const result = await mongodb.getDb().collection('ailments').insertOne(ailment);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAilment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const ailmentId = new ObjectId(req.params.id);
    const ailment = {
      name: req.body.name,
      symptoms: req.body.symptoms,
      description: req.body.description,
      causes: req.body.causes,
      severity: req.body.severity,
      contagious: req.body.contagious,
      treatment: req.body.treatment
    };
    const result = await mongodb
      .getDb()
      .collection('ailments')
      .replaceOne({ _id: ailmentId }, ailment);
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Ailment not found' });
    }
    res.status(200).json({ message: 'Ailment updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAilment = async (req, res) => {
  try {
    const ailmentId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .collection('ailments')
      .deleteOne({ _id: ailmentId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Ailment not found' });
    }
    res.status(200).json({ message: 'Ailment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createAilment,
  updateAilment,
  deleteAilment
};