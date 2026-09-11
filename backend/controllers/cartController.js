const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('cartItems.product');
    if (cart) {
      res.json(cart);
    } else {
      res.json({ cartItems: [] });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching cart' });
  }
};

const addToCart = async (req, res) => {
  const { _id, quantity } = req.body; // _id is product id
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
      const itemIndex = cart.cartItems.findIndex((item) => item.product.toString() === _id);

      if (itemIndex > -1) {
        let productItem = cart.cartItems[itemIndex];
        productItem.quantity += quantity;
        cart.cartItems[itemIndex] = productItem;
      } else {
        cart.cartItems.push({ product: _id, quantity });
      }
      await cart.save();
      res.status(201).json(cart);
    } else {
      const newCart = await Cart.create({
        user: req.user._id,
        cartItems: [{ product: _id, quantity }],
      });
      res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error adding to cart' });
  }
};

const deleteFromCart = async (req, res) => {
  const { id } = req.params; // product id to remove
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.cartItems = cart.cartItems.filter((item) => item.product.toString() !== id);
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting from cart' });
  }
};

module.exports = { getCart, addToCart, deleteFromCart };
