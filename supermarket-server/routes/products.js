const _ = require('lodash');
const { Product } = require('../models/ProductsModel');
const mongoose = require('mongoose');
const multer = require('multer');
const express = require('express');
const router = express.Router();

const app = express();

app.use(express.static('./client'));
app.use(express.static(__dirname + '/'));


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
     },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split("/")[1];
        cb(null , `${file.originalname}-${Date.now()}.${ext}`);
    }
  });

const upload = multer({
    storage: storage
  });


router.post('/', upload.single('image'),  async (req,res) => {
  // let product = await Product();
  const { name , price, category } = req.body
    const image = 'http://localhost:5500/uploads/' + req.file.filename;
    // console.log('image - ',image);
    // product = new Product(req.body, image,  _.pick(product, ['name','price','image','category']));

    product = new Product({
      name,
      price,
      image,
      category
    });

    console.log('the product request file and body', product);

    product._id instanceof mongoose.Types.ObjectId;
    await product.save();


    res.send(_.pick(product, ['_id','name','price','image','category']));
});


router.get ('/', async (req, res) => {
  const products = await Product.find();
  res.status(200).json({ products });
});


module.exports = router;