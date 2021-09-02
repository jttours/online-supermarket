let mongoose = require('mongoose');



// Users Schema
const User = mongoose.model('User', {
    idNumber: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 9,
        unique: true
    }, 
    username: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    },
    password1: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024
    },
    password2: {
        type: String,
        minLength: 5,
        maxLength: 1024
    },
    city: {
        type: String,
        minLength: 5,
        maxLength: 255
    },
    street: {
        type: String,
        minLength: 5,
        maxLength: 255
    },
    firstName: {
        type: String,
        minLength: 2,
        maxLength: 255
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 255
    },
    admin: {
        type: Boolean
    }

});




module.exports = { User };
// exports.validate = validateUser;