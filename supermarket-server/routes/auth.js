const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/UsersModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res) => {
    console.log(req.body);
    let user = await User.findOne({ username: req.body.username});
    console.log('the user is - ',user);
    if (!user) return res.status(400).send('Invalid email or password!');

    const validPassword = await bcrypt.compare(req.body.password,user.password1);
    if(!validPassword) return res.status(400).send('Invalid email or password!');

    const token = JSON.stringify(jwt.sign({firstName: user.firstName, admin: user.admin}, 'jwtPrivateKey'));
    res.send(token);
});




module.exports = router;