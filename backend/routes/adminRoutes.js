const express = require('express');
const { getAllUsers, addProduct, updateProduct, deleteProduct } = require('../controllers/adminController');
const { protect, admin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/users').get(protect, admin, getAllUsers);
router.route('/product').post(protect, admin, addProduct);
router.route('/product/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
