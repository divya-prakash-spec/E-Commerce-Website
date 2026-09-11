const express = require('express');
const { addReview, getReviews } = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, addReview);
router.post('/:id', getReviews); // Frontend passes filterType in body but hits /api/reviews/:id

module.exports = router;
