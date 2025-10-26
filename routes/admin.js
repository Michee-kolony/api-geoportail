const express = require('express');
const { register, getadmin, signin } = require('../controllers/admin');
const router = express.Router();

router.post('/signup', register);
router.get('/admin/users', getadmin);
router.post('/login', signin);

module.exports = router;