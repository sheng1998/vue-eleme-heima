var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/eleme', {
    useNewUrlParser: true
});

var imgcategorySchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    describe: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Imgcategory', imgcategorySchema);