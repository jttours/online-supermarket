const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/UsersModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ userIdNumber: req.body.userIdNumber});
    if (user) return res.status(400).send('User already registered');


    user = new User(req.body, _.pick(user, ['userIdNumber','userEmail','userPassword','userCity','userStreet','userFirstName','userLastName']));
    const salt = await bcrypt.genSalt(10);
    user.userPassword = await bcrypt.hash(user.userPassword,salt);


    // user = new User({
    //     userIdNumber: req.body.userIdNumber,
    //     userEmail: req.body.userEmail,
    //     userPassword: req.body.userPassword,
    //     userCity: req.body.userCity,
    //     userStreet: req.body.userStreet,
    //     userFirstName: req.body.userFirstName,
    //     userLastName: req.body.userLastName,
    // })
    
    await user.save();


    res.send(_.pick(user, ['_id','userIdNumber','userEmail','userCity','userStreet','userFirstName','userLastName']));
});

module.exports = router;