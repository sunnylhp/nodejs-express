/**
 * Created by Administrator on 2017/4/17.
 */
var express = require('express');
var router = express.Router();
var formidable = require('formidable');

var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}))
/*
get login page
 */
router.get('/register/login',function (req, res, next) {
    res.render('register/login');
});
router.post('/register/login',function (req, res, next) {
    var form = new formidable.IncomingForm();
    //console.log(req)
   res.json({
       Result:'ok',
       Code:1,
       Msg:'Success'
   });
    //res.send('ok')
    //res.send("<script>setTimeout('window.location.reload();',1) </script>")
})
module.exports = router;
