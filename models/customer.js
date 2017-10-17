/**
 * Created by Administrator on 2017/4/7.
 */
var mongoose = require('mongoose');
var db = mongoose.createConnection('127.0.0.1','test');
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function (callback) {
    
})

var PersonSchema = new mongoose.Schema({
    name:String
});
var PersonModel = db.model("Person",PersonSchema);

var personEntity = new PersonModel({name:'monkey'});
console.log(personEntity.name)
