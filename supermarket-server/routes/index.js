const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;    


const { UsersModel } = require('../models/UsersModel');





// Get all transactions for a specific account number

router.get('/api/operations/:accountNumber', (req, res) => {
    UsersModel.find({accountNumber : req.params.accountNumber}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
           console.log(err);
        }
    });
});




// Save transaction for a specific bank account
router.post('/api/users/add', (req, res) => {
    //console.log(req.bod)
    
    const user = new UsersModel({
        userIdNumber: req.body.userIdNumber,
        userEmail: req.body.userEmail,
        userPassword: req.body.userPassword,
        userCity: req.body.userCity,
        userStreet: req.body.userStreet,
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,

    });
    user.save((err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Model Added Successfully', addUser: data})
        } else {
           console.log(err);
        }
    });
});



module.exports = router;