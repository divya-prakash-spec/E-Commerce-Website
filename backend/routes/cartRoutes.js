const express = require('express');
const { getCart, addToCart, deleteFromCart } = require('../controllers/cartController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getCart).post(protect, addToCart);
router.route('/:id').delete(protect, deleteFromCart);

module.exports = router;
