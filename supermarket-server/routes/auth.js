const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/UsersModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res) => {
    
    let user = await User.findOne({ userEmail: req.body.userEmail});
    if (!user) return res.status(400).send('Invalid email or password!');

    const validPassword = await bcrypt.compare(req.body.userPassword,user.userPassword);
    if(!validPassword) return res.status(400).send('Invalid email or password!');

    const token = jwt.sign({userFirstName: user.userFirstName}, 'jwtPrivateKey')
    res.send(token);
});




module.exports = router;