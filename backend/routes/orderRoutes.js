const express = require('express');
const { getPreviousOrders, checkout, verifyPayment, getKey } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/previous', protect, getPreviousOrders);
router.post('/checkout', protect, checkout);
router.post('/paymentverification', protect, verifyPayment);
router.get('/getkey', protect, getKey);

module.exports = router;
