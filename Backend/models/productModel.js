const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please Enter product Name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please Enter product Description'],
    },
    price: {
      type: Number,
      required: [true, 'Please Enter product Price'],
      maxlength: [8, 'Price cannot exceed 8 character'],
    },
    rating: {
      type: Number,
      default: 0,
    },
    images: [
      {
        publicId: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    category: {
      type: String,
      required: [true, 'Category of product is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock of product is required'],
      maxlength: [4, 'Stock cannot exceed 4 character'],
      default: 1,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Product', productSchema)