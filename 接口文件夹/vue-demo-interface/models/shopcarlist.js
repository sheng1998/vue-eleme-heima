var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/eleme', {
    useNewUrlParser: true
});

var shopcarlistSchema = new Schema({
    selection: {
        type: Number,
        enum: [0, 1],
        default: 1
    },
    id: {
        type: Number,
        required: true
    },
    add_time: {
        type: Date,
        required: true,
        default:new Date
    },
    title: {
        type: String,
        required: true
    },
    sell_price: {
        type: Number,
        required: true
    },
    thumb_path: {
        type: String,
        required: true
    },
    Num: {
        type: Number,
        required: true,
        default: 1
    }
})

module.exports = mongoose.model('shopcarlist', shopcarlistSchema);