var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/eleme', {
    useNewUrlParser: true
});

var commentsSchema = new Schema({
    sort: {
        type: String,
        required: true
    },
    art_id: {
        type: Number,
        required: true
    },
    user_name: {
        type: String,
        required: true,
        default: "匿名用户"
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

module.exports = mongoose.model('Comment', commentsSchema);