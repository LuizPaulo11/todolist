const express = require('express');
const router = express.Router();

router.get('/lista', (req, res) => {
    res.send('Olá Mundo!');
});

module.exports = router;