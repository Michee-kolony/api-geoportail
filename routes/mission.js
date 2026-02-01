const express = require('express');
const { createMission, getMission, deleteMission } = require('../controllers/mission');
const router = express.Router();

router.post('/', createMission);
router.get('/', getMission);
router.delete('/:id', deleteMission);

module.exports = router;