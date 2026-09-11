const Wishlist = require('../models/Wishlist');

const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('wishlistItems.product');
    if (wishlist) {
      res.json(wishlist);
    } else {
      res.json({ wishlistItems: [] });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching wishlist' });
  }
};

const addToWishlist = async (req, res) => {
  const { _id } = req.body; // product id
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (wishlist) {
      const itemIndex = wishlist.wishlistItems.findIndex((item) => item.product.toString() === _id);

      if (itemIndex === -1) {
        wishlist.wishlistItems.push({ product: _id });
        await wishlist.save();
      }
      res.status(201).json(wishlist);
    } else {
      const newWishlist = await Wishlist.create({
        user: req.user._id,
        wishlistItems: [{ product: _id }],
      });
      res.status(201).json(newWishlist);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error adding to wishlist' });
  }
};

const deleteFromWishlist = async (req, res) => {
  const { id } = req.params; // product id
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
      wishlist.wishlistItems = wishlist.wishlistItems.filter((item) => item.product.toString() !== id);
      await wishlist.save();
      res.json(wishlist);
    } else {
      res.status(404).json({ message: 'Wishlist not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting from wishlist' });
  }
};

module.exports = { getWishlist, addToWishlist, deleteFromWishlist };
