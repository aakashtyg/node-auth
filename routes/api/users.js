const express = require('express');
const router = express.Router();
const usersApiController = require('../../controller/api/usersApi');

// means - /api/users/
router.get('/', usersApiController.index);

// means - /api/users/login
router.get('/login', () => {});

// means - /api/users/signup
router.get('/signup', () => {});

module.exports = router;