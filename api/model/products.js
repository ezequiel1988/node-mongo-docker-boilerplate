const { Schema, model } = require('mongoose');


const productsSchema = new Schema({
    category: {
        type:String
    },
    productName:{
        type:String
    },
    price:{
        type:Number
    },
    stock:{
        type:Number,
        default:0
    },
    image:{
        type:String
    },
    diaIngreso: {
        type: Date,
        default: new Date()
    }
}, {
    timestamps: true
});

module.exports = model('Productos', productsSchema)