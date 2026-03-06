const express = require('express');
const router = express.Router();

router.get('/professional', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const data = await db.collection('professional').findOne({});
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Somethingwent wrong'});
  }
});
  
module.exports = router;