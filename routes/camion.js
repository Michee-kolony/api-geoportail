const express = require('express');
const { ajout, getcamion, deletecamion, getonecamion } = require('../controllers/camion');
const router = express.Router();

router.post('/', ajout);
router.get('/', getcamion);
router.delete('/:id', deletecamion);
router.get('/:id', getonecamion);

module.exports = router;