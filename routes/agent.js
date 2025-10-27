const express = require('express');
const { register, getagent, login } = require('../controllers/agent');
const router = express.Router();

router.post('/signup', register);
router.get('/', getagent);
router.post('/login', login);


module.exports = router;