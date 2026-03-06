const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// GET all contacts
router.get('/contacts', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const contacts = await db.collection('contacts').find().toArray();
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET single contact by ID
router.get('/contacts/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const contact = await db.collection('contacts').findOne({
      _id: new ObjectId(req.params.id)
    });
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;