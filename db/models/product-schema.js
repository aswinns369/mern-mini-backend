
const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  Image: { type: String },
  category: { type: String, required: true },
  stock: { type: Number, default: 1, min: 0 },
  dateAdded: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

productSchema.index({ name: 'text', category: 1, price: 1 });

module.exports = model('Product', productSchema);