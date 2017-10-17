var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/blog';
var db;
MongoClient.connect(url,function (err, database) {
    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        db = database;
        console.log('connect success!')
    }
})
module.exports.bd = db;
