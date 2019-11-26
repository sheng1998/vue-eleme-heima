var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/eleme', {
    useNewUrlParser: true
});

var imgInfoSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    click: {
        type: Number,
        required: true,
        default: 0
    },
    add_time: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ImgInfo', imgInfoSchema);