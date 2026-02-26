const express = require('express');
const router = express.Router();

router.get('/post/test', (req, res) => {
  res.status(400).json({ message: 'password or email is incorrect' });
  
});

module.exports = router;
