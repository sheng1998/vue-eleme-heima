var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/eleme', {
    useNewUrlParser: true
});

var goodSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    add_time: {
        type: Date,
        required: true,
        default: new Date
    },
    zhaiyao: {
        type: String,
        required: true
    },
    click: {
        type: Number,
        required: true,
        default: 0
    },
    img_url: {
        type: String,
        required: true
    },
    sell_price: {
        type: Number,
        required: true
    },
    market_price: {
        type: Number,
        required: true
    },
    stock_quantity: {
        type: Number,
        required: true,
        default: 0
    },
    goods_no:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Good', goodSchema);