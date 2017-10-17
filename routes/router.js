var express = require('express');
var router =  express.Router();

//中间件，添加header,footer
router.use(function (req, res, next) {
    if (!res.locals.layoutHeader) res.locals.layoutHeader = {};
    res.locals.layoutHeader.navs = getNavigation();
    next();
});
router.use(function (req, res, next) {
    if (!res.locals.layoutFooter) res.locals.layoutFooter = {};
    res.locals.layoutFooter.copyright = getFooter();
    next();
});


function getNavigation() {
    return {
        links:[
            {
                url:'/',
                text:'首页'
            },
            {
                url:'',
                text:'我的博客'
            },
            {
                url:'',
                text:'关于我们'
            }
        ]
    };
}
function  getFooter() {
    return {
        copyright:'Copyright © 2017 HotOEM.com. All rights reserved. '
    }
}

/*

 */
router.use('/',require('./home'));               //首页
router.use('/login',require('./login'));        //登录
router.use('/publish',require('./publish'));    //发布文章
router.use('/register',require('./register'));  //注册

router.use('/table',require('./table'))





module.exports = router;