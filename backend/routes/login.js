const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const user = req.body;

    console.log(user);
});

module.exports = router;