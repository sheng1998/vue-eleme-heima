var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/eleme', {
    useNewUrlParser: true
});

var thumimagesSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    add_time: {
        type: Date,
        required: true,
        default:Date.now
    },
    src: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Thumimage', thumimagesSchema);