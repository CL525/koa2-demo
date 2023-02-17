const path = require('path');

const Koa = require('koa');
const views = require('koa-views');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const parameter =require('koa-parameter');

const errHandler = require('../errHandler');
const apiRouter = require('../routes/api/index.js');//引入外部路由
const app = new Koa();

//中间件，访问所有路由都会触发
app.use(async (ctx, next) => {
    console.log('执行');
    await next();
    console.log('接口输出结果', ctx.response)
    // if (ctx.status == 409) {
    //     Object.assign(ctx.response.body, {
    //         results: '11'
    //     })
    // }
});

console.log(__dirname)
app.use(views(__dirname + '../views', {
    map: {
        html: 'ejs'
    }
}));
app.keys = ['this is str'];
app.use(koaStatic(__dirname + '../'));
app.use(bodyParser());
app.use(parameter(app));

const SESSIONCONFIG = {
    key: 'koa.sess',
    maxAge: 1000 * 60,
}
app.use(session(SESSIONCONFIG, app));
//启动路由
app.use(apiRouter.routes())
    .use(apiRouter.allowedMethods());

//返回错误监听处理
app.on('error', errHandler);

module.exports = app