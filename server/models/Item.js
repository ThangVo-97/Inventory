const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true,
    enum: ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Other'],
    default: 'Other'
   },
  purchaseDate: { type: Date, default: Date.now },
  price: { type: Number, required: true },
  warrantyExpiry: { type: Date },
  location: { type: String },
  userId: { type: String, required: true }, // To link items to users
  imageUrl: { type: String }, // For future image uploads
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);