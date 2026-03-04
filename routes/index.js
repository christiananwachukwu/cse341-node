const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.get('/about', (req, res) => {
    res.send({
        name: 'Christiana Nwachukwu',
        course: 'CSE 341 - Web Services',
        institution: 'BYU-Idaho'
    });
});
router.get('/search', (req, res) => {
    const name = req.query.name;
    const course = req.query.course;
    res.send(`You searched for name: ${name} and course: ${course}`);
});
router.get('/headers', (req, res) => {
    res.setHeader('X-Powered-By', 'Christiana-CSE341');
    res.setHeader('X-Custom-Message', 'Hello from my server!');
    
    const headers = req.headers;
    res.json(headers);
});

module.exports = router;