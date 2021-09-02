const _ = require('lodash');
const { Product } = require('../models/ProductsModel');
const mongoose = require('mongoose');
const multer = require('multer');
const express = require('express');
const router = express.Router();


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './');
     },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null , `uploads/${file.originalname}-${Date.now()}.${ext}`);
    }
  });

const upload = multer({
    storage: storage
  });


router.post('/', upload.single('imagePath'), async (req,res) => {
  let product = await Product();
    console.log('is this it?    ',req.body,req.file)
    const imagePath = 'http://localhost:4200/images/' + req.file.filename;
    product = new Product(req.body, _.pick(product, ['name','price','image','category']));

    console.log('the product request file and body', product);

    product._id instanceof mongoose.Types.ObjectId;
    await product.save();


    res.send(_.pick(product, ['_id','name','price','image','category']));
});



module.exports = router;