var express = require('express');
var router = express.Router();

var db = require('../db');
router.get('/:id',function (req, res, next,value) {
    console.log(value)
    var c = db.get().collection('list')
    c.find().toArray(function (err,data) {
        
    })
})