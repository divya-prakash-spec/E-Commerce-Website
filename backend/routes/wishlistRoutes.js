const express = require('express');
const { getWishlist, addToWishlist, deleteFromWishlist } = require('../controllers/wishlistController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getWishlist).post(protect, addToWishlist);
router.route('/:id').delete(protect, deleteFromWishlist);

module.exports = router;
