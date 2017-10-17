var express = require('express');
var router = express.Router();
//GET
router.get('/',function (req, res, next) {
    res.render('./login/login',{layout:'./_layout'});
})

//POST
router.post('/',function (req, res) {
    req.session.regenerate(function () {
        req.session.loginUser = 'lhp'
    })
    var  options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: true, // Indicates if the cookie should be signed
        secure:false
    }
    //res.cookie('sessionId','123213',options);
    //res.clearCookie();
    res.json(req.body)
    //res.send('aaa')
})

module.exports = router;