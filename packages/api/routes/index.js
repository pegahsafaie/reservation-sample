const express = require('express');
const ReservationController = require('../controllers/ReservationController');
const router = express.Router();

router.get(`/reservation`, ReservationController.getAll);
router.post(`/reservation`, ReservationController.insert);

module.exports = router;
