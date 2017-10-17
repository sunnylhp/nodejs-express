var express = require('express');
var router = express.Router();

var db = require('../db');

//GET
router.get('/',function (req, res, next) {
    var collection = db.get().collection('list')
    collection.find().toArray(function (err, docs) {
        res.render('./table',{items:docs});
    })

})

//POST


module.exports = router;