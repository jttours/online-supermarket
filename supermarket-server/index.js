const express = require('express');
const cors = require('cors');
const multer = require('multer');

const users = require('./routes/users');
const auth = require('./routes/auth');
const products = require('./routes/products');


const app = express();
app.use(cors());

const mongoose = require('./db/mongoose');


  app.use(express.static('./client'));
  app.use(express.static(__dirname + '/'));

const PORT = 5500;

app.use(express.json());

// Routes
app.use('/api/users/add', users);
app.use('/api/auth', auth);
app.use('/api/products/add', products);
app.use('/api/products/getAllProducts', products);




app.listen(PORT, () => console.log(`started at port ${PORT}`));