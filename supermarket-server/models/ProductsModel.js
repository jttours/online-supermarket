let mongoose = require('mongoose');


// Product Schema
const Product = mongoose.model('Product', {
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255
    }, 
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        minLength: 5,
        maxLength: 255
    }

});




module.exports = { Product };
// exports.validate = validateUser;