const express = require('express');
const router = express.Router();

// means - /api/users/
router.get('/', (req, res) => {
  return res.status(200).json({
    success: true
  })
});

// means - /api/users/login
router.get('/login', () => {});

// means - /api/users/signup
router.get('/signup', () => {});

module.exports = router;