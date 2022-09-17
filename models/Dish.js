const mongoose = require('mongoose');

const DishSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    category: {
        type: String,
        default: 'misc'
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Dishes', DishSchema);