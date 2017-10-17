/*
publish
 */
 var express = require('express');
 var router = express.Router();
 var db = require('../db');

//publish
router.get('/',function (req, res, next) {
    res.render('./publish/publish')
})

router.post('/',function (req, res) {
    var c = db.get().collection('list')
console.log('r:',req.body)
   var obj = req.body
    c.insert(obj)

    c.find().toArray(function (err, result) {
        console.log(result)
    })
    res.redirect(req.originalUrl);
})

module.exports = router;