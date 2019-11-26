var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/eleme', {useNewUrlParser: true});

var homeSchema = new Schema({
    url:{
        type:String,
        required:true
    },img:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Home', homeSchema);