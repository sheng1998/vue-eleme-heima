var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/eleme', {
    useNewUrlParser: true
});

var imgSchema = new Schema({
    imgcategory_id: {
        type: Number,
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    img_id: {
        type: Number,
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

module.exports = mongoose.model('Img', imgSchema);