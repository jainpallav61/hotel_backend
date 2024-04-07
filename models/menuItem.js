const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['spicy','sweet','sour'],
        required: true
    },
    is_drink: {
        type: Boolean,
        deafault: false
    },
    ingrediants: {
        type: [String],
        deafault: []
    },
    num_sales: {
        type: Number,
        deafault: 0
    }
})

const MenuItem = mongoose.model('MenuItem',menuItemSchema);

module.exports = MenuItem;