const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

// Add product
const addProduct = async (req, res) => {
  const { name, image, description, brand, category, price, countInStock, type } = req.body;
  try {
    const product = new Product({
      name,
      image,
      description,
      brand,
      category,
      price,
      countInStock,
      type,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error adding product' });
  }
};

// Update product
const updateProduct = async (req, res) => {
  const { name, image, description, brand, category, price, countInStock, type } = req.body.productDetails || req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.image = image || product.image;
      product.description = description || product.description;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.price = price || product.price;
      product.countInStock = countInStock || product.countInStock;
      product.type = type || product.type;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error updating product' });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting product' });
  }
};

module.exports = { getAllUsers, addProduct, updateProduct, deleteProduct };
