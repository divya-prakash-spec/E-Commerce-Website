const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching product' });
  }
};

const getProductsByType = async (req, res) => {
  const { userType } = req.body;
  try {
    const products = await Product.find({ type: userType });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching products by type' });
  }
};

const getProductsByCategory = async (req, res) => {
  const { userType, userCategory } = req.body;
  try {
    const products = await Product.find({ type: userType, category: userCategory });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching products by category' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByType,
  getProductsByCategory,
};
