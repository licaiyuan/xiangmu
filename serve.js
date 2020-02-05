const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const router = new Router();
const render = require('koa-ejs');
const path = require('path');
const serve = require('koa-static');
const cors = require('koa2-cors'); //跨域处理
var range = require('koa-range');
var mongoose = require('mongoose');
const multer = require('koa-multer');

app.use(cors());
const formidable = require('koa-formidable'); // 图片处理
const fs = require('fs'); // 图片路径


var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/upload/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        // cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage });
let { scspzp2 } = require("./user.js");
let { account2 } = require("./user.js");

app.use(bodyParser());
app.use(range);

/**静态资源（服务端） */
app.use(serve(path.join(__dirname + "/public")));

render(app, {
    root: path.join(__dirname, 'views'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: false
});
//
router.get('/', (ctx, next) => {
    ctx.body = 'zxczxc'
});
//登录或者注册
router.post('/login', async function (ctx, next) {

    // console.log(ctx.query)
    console.log(ctx.request.body)
    let { account, loginStatus } = ctx.request.body
    let accounts = new account2(account)
    const registe = () => {
        return new Promise((resolve, reject) => {
            accounts.save(function (err, res) {
                console.log("注册:" + '-' + res);
                resolve(res)
            });
        })
    }

    const login = () => {
        return new Promise((resolve, reject) => {
            account2.find({ 'username': account.username }, function (err, res) {
                console.log("登录:" + '-' + res)
                resolve(res)
            })
        })
    }
    let result = loginStatus == '注册' ? await registe() : await login()

    ctx.body = result;

});
//请求视频列表
router.get('/spqqlb', async function (ctx, next) {

    const promiseClick = () => {


        //做一些异步操作
        var pageSize = 20;                   //一页多少条
        var currentPage = 1;                //当前第几页
        var sort = { 'logindate': -1 };        //排序（按登录时间倒序）
        var condition = {};                 //条件
        var skipnum = (currentPage - 1) * pageSize;   //跳过数
        return new Promise((resolve, reject) => {
            scspzp2.find({}).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
                resolve(res)
                console.log(res)
            })

        })

    }
    const sjjs = () => {
        return new Promise((resolve, reject) => {
            scspzp2.count({}, function (err, res) {
                resolve(res)
            })
        })
    }
    // let sl = await sjjs();
    // ctx.body = await promiseClick();
    ctx.body = {
        sl: await sjjs(),
        content: await promiseClick()
    }





});
//上传图片文件视频

router.post('/upload/image', upload.array('sp', 5), async function (ctx, next) {

    console.log(ctx.req.body)
    let { title, jj, spmz, zpmz } = ctx.req.body

    let scspzpa = new scspzp2({
        title: title,
        jj: jj,
        spmz: spmz,
        zpmz: zpmz,
    });
    scspzpa.save(function (err, res) {
        if (err) {
            console.log("Error:" + err);
        } else {
            console.log("Res:" + res);
        }
    });
    // console.log(ctx.req.zp)
    ctx.body = {
        filename: 'bbbb'//返回文件名
    }
})

// app.use(static(__dirname + './staticPath'));

app
    .use(router.routes())
    .use(router.allowedMethods())
// .use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Credentials', true);
//     await next();
// });
console.log('服务器开启')
// 监听4000端口
app.listen(4000);