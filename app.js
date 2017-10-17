var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

var cookieParser = require('cookie-parser');
var bodydParser = require('body-parser');
var session = require('express-session');

var routers = require('./routes/router')



app.set('port',process.env.PORT || '3000');
app.set('views', path.join(__dirname, 'views'));
app.use('/static',express.static(__dirname+'/public'));

/*设置handlebars视图引擎
 *set up an Express app to use .hbs as the file extension for views
 *文档参考 https://www.npmjs.com/package/express3-handlebars
 */
var exphbs  = require('express3-handlebars');
var hbsEngine = exphbs.create({
    extname:'.hbs',
    defaultLayout:'_layoutDefault',
    layoutsDir:'views/layouts',
    helpers: {
        section: function(name, options){
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
app.engine('hbs',hbsEngine.engine);
app.set('view engine', 'hbs');


//var multer = require('multer');
app.use(bodydParser.json());
app.use(bodydParser.urlencoded({extended:true}));
app.use(cookieParser('lhp'));
app.set('trust proxy', 1)
app.use(session({
    name:'identity',
    secret: '123456',
    resave: false,
    cookie:{maxAge:80000},
    saveUninitialized: true,
    cookie: { secure: true }
}))
//app.use(multer());

/*
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

var url = 'mongodb://127.0.0.1:27017/mydata';
MongoClient.connect(url,function (err, db) {
    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        db.collection('mydata').find().toArray(function (err, result) {
            if(err){
                throw err;
            }
            console.log(result)
        })
        console.log('aaa')
    }
})
*/
var url = 'mongodb://127.0.0.1:27017/blog';
var db = require('./db');


 db.connect(url,function (err) {
 if(err){
 console.log(err)
 }else{
 console.log('success')
 }
 })

/*
 app.use('/table',function (req, res, next) {
 db.collection('user').find().toArray(function (err, result) {
 if(err){
 throw err;
 }
 console.log(result)
 })
 })
app.post('/process',function (req, res) {
    console.log(req);
    console.log(req.body);
    res.json(req.body);
});
*/

/*
 上传文件
 */
var formidable = require('formidable');

app.get('/file',function (req,res) {
    var now = new Date();
    res.render('file',{
        year:now.getFullYear(),
        month:now.getMonth()
    });
});

//确定保存在目录data
var dataDir = __dirname +'/data';
var photoDir = dataDir+'/img';
fs.existsSync(dataDir) || fs.mkdirSync(dataDir);
fs.existsSync(photoDir) || fs.mkdirSync(photoDir);
app.post('/file/:year/:month',function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if(err) return res.redirect('303','/error');
        var now = new Date();
        var fileName = now.getFullYear()+(now.getMonth()+1)+now.getDate()+now.getHours()+''+now.getMinutes()+''+now.getSeconds();
        var photo = files.photo;
        var dir = photoDir + '/'+fileName;
        var path = dir + '/'+photo.name;
        fs.mkdirSync(dir);
        fs.renameSync(photo.path,dir + '/'+photo.name);
      /*
       req.session.flash = {
       type: 'success',
       intro: 'Good luck!',
       message: 'You have been entered into the contest.',
       };
       */
        //console.log('received fields:',fields);

        //console.log('received files:',files);
    })
})

//将路由挂载到应用
app.use(routers);

//404页面
app.use(function (req, res) {
    //res.type('text/plain');
    //res.status(404);
    //res.send('404 - Not Found');
    var message = '404 - Not Found'
    var error = {
        status:404,
        stack:res.stack
    }
    res.render('./error/404',{layout:false,message:message,error:error})
});

//505页面
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.send(err)
});


/*
app.listen(app.get('port'),function () {
    console.log('Express started on http://localhost:'+app.get('port')+' ;press Ctrl-C to terminate')
});
*/
module.exports = app;
