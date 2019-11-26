var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/eleme', {
    useNewUrlParser: true
});

var newInfoSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    click: {
        type: Number,
        required: true
    },
    add_time: {
        type: Date,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('NewInfo', newInfoSchema);