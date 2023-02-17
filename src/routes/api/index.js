const Router = require('@koa/router');
const router = new Router();
const allRouter = require('./routes/index');
// const user = require('./routes/user.router');

router.prefix('/api');
// router.use(user.routes());
router.use(allRouter.routes());

router.get('/', async (ctx)=> {
    console.log('首页3');
    ctx.session.usename="张三";
    let {a} = ctx.query
    ctx.body = {
        status: a ==  1 ? 1 : -1,
        results: [{
            a: '11'
        }]
    }
});

router.get('/score', async (ctx)=> {
    await ctx.render('index.html', {
        "title": '哈哈',
        "score": 88,
        "list": ['吃饭', '睡觉', '上班', ctx.session.usename]
    })
});

router.get('/news', async (ctx)=> {
    ctx.body='你好,news'
});


router.get('/product/:id', async (ctx) => {
    let {params} = ctx;
    ctx.body = {
        params
    }
});

router.post('/product/add', async (ctx) => {
    
    let {request} = ctx;
    console.log(request.body)
    ctx.response.body = request.body
});

module.exports = router;