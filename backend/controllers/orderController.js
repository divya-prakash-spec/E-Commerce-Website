const Order = require('../models/Order');

const getPreviousOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('orderItems.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching previous orders' });
  }
};

const checkout = async (req, res) => {
  // Mock checkout logic since we don't have a real payment gateway integrated yet
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  } else {
    try {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(500).json({ message: 'Server error creating order' });
    }
  }
};

const verifyPayment = async (req, res) => {
  // Mock payment verification
  const order = await Order.findById(req.body.orderId);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

const getKey = async (req, res) => {
  res.json({ key: process.env.PAYMENT_GATEWAY_KEY || 'mock-key-123' });
};

module.exports = { getPreviousOrders, checkout, verifyPayment, getKey };
