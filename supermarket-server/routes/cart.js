const _ = require('lodash');
const { Cart } = require('../models/CartModel');
const { Product } = require('../models/ProductsModel');
const { User } = require('../models/UsersModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const app = express();



router.post("/", async (req, res) => {
   //console.log ('the cart - ',req.body);
    const { cartProduct_Id, cartProductName, cartProductQuantity, cartProductImage, cartProductUnitPrice } = req.body;
    const userId = req.body.cartCurrentUser_Id; // The logged in user id
    const productId = cartProduct_Id;
    const productName = cartProductName;
    const productQuantity = cartProductQuantity;
    const productImage = cartProductImage;
    const productPrice = cartProductUnitPrice;


    //console.log('user id - ',userId);
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
  
        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.productQuantity = productQuantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId, productName, productQuantity, productImage, productPrice});
        }
        cart = await cart.save();
        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart

        

        const newCart = new Cart({
            userId,
        });
        newCart.products.push({ productId, productName, productQuantity, productImage, productPrice });

        console.log('the newCart request file and body', newCart);

        await newCart.save();

        return res.status(201).send(newCart);
      
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
});
    
router.get('/:userId',async(req,res) => {
  console.log('body',req.params);
  const { userId } = req.params;
  console.log('user id - ', userId);
  try {
    let cart = await Cart.findOne({ userId });
    console.log((Array.isArray(cart.products)));
    return res.status(201).send(cart.products);

  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }

})


module.exports = router;


