const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/UsersModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res) => {
    

    let user = await User.findOne({ idNumber: req.body.idNumber});
    if (user) return res.status(400).send('User already registered');


    user = new User(req.body, _.pick(user, ['idNumber','username','password1','password2','city','street','firstName','lastName','admin']));
    const salt = await bcrypt.genSalt(10);
    user.password1 = await bcrypt.hash(user.password1,salt);
    user.password2 = await bcrypt.hash(user.password2,salt);


    
    
    await user.save();


    res.send(_.pick(user, ['_id','idNumber','username','city','street','firstName','lastName']));
});

module.exports = router;