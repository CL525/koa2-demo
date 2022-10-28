const Router = require('@koa/router');
const router = new Router();
const { add, getList, upData} = require('../controller/cart.controller');
const { validator, checkGoodsById } = require('../middleware/cart.middlerware');
const { auth } = require('../middleware/auth.middlerware');
//api/user
router.prefix('/cart')

//加入购物车api/cart/add token验证 加购参数验证以及商品是否支持加购
router.post('/add', auth, validator({
    goods_id: { type: 'number', required: true },
    quantity: { type: 'number', required: true },
}), checkGoodsById, add);

//获取购物车列表api/cart/list token验证 
router.get('/list', auth, getList);

//更新购物车
router.patch('/', auth, validator({
    goods_id: { type: 'number', required: true },
    quantity: { type: 'number', required: false },
    selected: { type: 'boolean', required: false },
}), upData)

module.exports = router;