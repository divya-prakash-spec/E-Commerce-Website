const express = require('express');
const {
  getProducts,
  getProductById,
  getProductsByType,
  getProductsByCategory,
} = require('../controllers/productController');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/type', getProductsByType);
router.post('/category', getProductsByCategory);

module.exports = router;
