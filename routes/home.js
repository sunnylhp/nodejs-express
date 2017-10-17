var express = require('express');
var router = express.Router();
var fs = require('fs');

var db = require('../db');

router.get('/',function (req, res, next) {
    //console.log(req.session)
    /*
    var fileData =fs.readFile('./menus.json',"utf-8",function (err, data) {
        res.render('./home',JSON.parse(data));
    });
    */

    var c = db.get().collection('list');
    var m = db.get().collection('menu');
    m.find().toArray(function (err, data) {

    })
    c.find().toArray(function (err, data) {

        //var items=[{'css':[]},{'js':[]},{'html':[]},{'other':[]}];
        var arr1=[]
        var arr2=[]
        var arr3=[]
        data.forEach(function(item,index){
            var c = item.category;
            switch (c){
                case '1':arr1.push(item);break;
                case '2':arr2.push(item);break;
                case '3':arr3.push(item);break;
                //default:items[3].push(item);break;
            }
        })
        var items=[
            {
                name:'CSS',
                list:arr1
            },
            {
                name:'Javascript',
                list:arr2
            },
            {
                name:'HTML',
                list:arr3
            }
        ]
        res.render('./home',{item:items,listItem:data})
    })
});



module.exports = router;
