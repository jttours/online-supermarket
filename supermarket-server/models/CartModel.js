let mongoose = require('mongoose');


const Cart = mongoose.model('Cart', {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            productName: String,
            productQuantity: {
                type: Number,
                required: true
            },
            productImage: String,
            productPrice: Number
        }
      ],
      modifiedOn: {
        type: Date,
        default: Date.now
      }
    }
  );
  
  module.exports = { Cart };