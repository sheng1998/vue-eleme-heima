var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/eleme', {
    useNewUrlParser: true
});

var newSchema = new Schema({
    add_time: {
        type: Date,
        required: true
    },
    click: {
        type: Number,
        required: true,
        default: 0
    },
    id: {
        type: Number,
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    zhaiyao: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('New', newSchema);