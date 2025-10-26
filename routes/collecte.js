const express  = require('express');
const { register, getall, getone } = require('../controllers/collecte');
const auth = require ('../middleware/auth');
const router = express.Router();

router.post('/', register);
router.get('/',auth,  getall);
router.get('/:id',auth, getone);

module.exports = router;