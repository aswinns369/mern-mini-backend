

const express = require('express');
const Cart = require('../db/models/cart-schema');
const Product = require('../db/models/product-schema');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

const ensureCart = async (userId) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({ userId, items: [] });
  }

  return cart;
};

router.get('/cart', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate('items.productId', 'name price Image');

    return res.status(200).json(cart || { userId: req.user.id, items: [] });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});


router.post('/cart/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: 'Product not found' });

    const cart = await ensureCart(req.user.id);

    const idx = cart.items.findIndex(
      (i) => i.productId.toString() === productId
    );

    if (idx >= 0) {
      cart.items[idx].quantity += Number(quantity);
    } else {
      cart.items.push({ productId, quantity: Number(quantity) });
    }

    await cart.save();

    const populated = await cart.populate(
      'items.productId',
      'name price Image'
    );

    return res.status(200).json(populated);

  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.patch('/cart/item/:productId', auth, async (req, res) => {
  try {
    const { qty } = req.body;

    if (qty < 1)
      return res.status(400).json({ message: 'Quantity must be >= 1' });

    const cart = await ensureCart(req.user.id);

    const idx = cart.items.findIndex(
      (i) => i.productId.toString() === req.params.productId
    );

    if (idx === -1)
      return res.status(404).json({ message: 'Item not in cart' });

    cart.items[idx].quantity = Number(qty);
    await cart.save();

    const populated = await cart.populate(
      'items.productId',
      'name price Image'
    );

    return res.status(200).json(populated);

  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.delete('/cart/item/:productId', auth, async (req, res) => {
  try {
    const cart = await ensureCart(req.user.id);

    cart.items = cart.items.filter(
      (i) => i.productId.toString() !== req.params.productId
    );

    await cart.save();

    const populated = await cart.populate(
      'items.productId',
      'name price Image'
    );

    return res.status(200).json(populated);

  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});


router.post('/cart/checkout', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate('items.productId', 'name price');

    if (!cart)
      return res.status(400).json({ message: 'Cart not found' });

    if (!cart.items || cart.items.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    const total = cart.items.reduce(
      (sum, i) => sum + (i.productId?.price || 0) * i.quantity,
      0
    );

    cart.items = [];
    await cart.save();

    return res.status(200).json({
      message: 'Order placed successfully!',
      total,
      orderId: Date.now().toString(),
    });

  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;