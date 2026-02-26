

const express = require('express');
const Product = require('../db/models/product-schema');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const buildQuery = q => {
  const { search, category, minPrice, maxPrice, userId } = q;
  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }
  if (category) query.category = category;
  if (userId) query.userId = userId;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  return query;
};

router.get('/product', async (req, res) => {
  try {
    const query = buildQuery(req.query); 
    const products = await Product.find(query).sort({ dateAdded: -1 }); 
    return res.status(200).json(products);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.post('/product', authMiddleware, async (req, res) => {
  try {
    const body = { ...req.body, userId: req.user.id };
    if (!body.category)
      return res.status(400).json({ message: 'Category is required' });
    if (body.stock == null) body.stock = 1;

    const productResponse = await Product.create(body);
    return res.status(201).json(productResponse);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.get('/product/:id', async (req, res) => {
  try {
    const response = await Product.findById(req.params.id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.delete('/product/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'Not authorized to delete this product' });
    }
    await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.patch('/product/:id', authMiddleware, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (product.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'Not authorized to update this product' });
    }
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updatedProduct);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
