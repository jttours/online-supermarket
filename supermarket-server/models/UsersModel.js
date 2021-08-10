const Joi = require('joi');
let mongoose = require('mongoose');



// AccountOperations Schema
const User = mongoose.model('User', {
    userIdNumber: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 9,
        unique: true
    }, 
    userEmail: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    },
    userPassword: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 1024
    },
    userCity: {
        type: String,
        minLength: 5,
        maxLength: 255
    },
    userStreet: {
        type: String,
        minLength: 5,
        maxLength: 255
    },
    userFirstName: {
        type: String,
        minLength: 2,
        maxLength: 255
    },
    userLastName: {
        type: String,
        minLength: 2,
        maxLength: 255
    }

});

function validateUser(user) {
    const schema = Joi.object ({
        userIdNumber: Joi.string()
        .min(5)
        .max(9)
        .required(),

        userEmail: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),

        userPassword: Joi.string()
        .min(5)
        .max(255)
        .required(),

        // userCity: Joi.string()
        // .min(5)
        // .max(255),

        // userStreet: Joi.string()
        // .min(5)
        // .max(255),

        // userFirstName: Joi.string()
        // .min(5)
        // .max(255),

        // userLastName: Joi.string()
        // .min(5)
        // .max(255)
    })

    return Joi.validate (user, schema);
};



module.exports = { User };
exports.validate = validateUser;