const Router = require('@koa/router')
const { create, upAddr, deleteAddr, setDefaultAddr, findAddrList } = require('../controller/addr.controller')
const { validator, findAddr } = require('../middleware/addr.middlerware')
const { auth } = require('../middleware/auth.middlerware')
const router = new Router({ prefix: '/address' })

//新增地址
router.post('/create', auth, validator({
    name: { type: 'string', required: true },
    tel: { type: 'string', required: true },
    province: { type: 'string', required: true },
    city: { type: 'string', required: true },
    district: { type: 'string', required: true },
    addon_address: { type: 'string', required: true }
}), create)

//更新地址
router.patch('/', auth, validator({
    id: { type: 'number', required: true },
    name: { type: 'string', required: true },
    tel: { type: 'string', required: true },
    province: { type: 'string', required: true },
    city: { type: 'string', required: true },
    district: { type: 'string', required: true },
    addon_address: { type: 'string', required: true }
}), findAddr, upAddr)

//删除地址
router.delete('/', auth, validator({
    id: { type: 'number', required: true }
}), findAddr, deleteAddr)

//设置默认地址
router.patch('/setDefault', auth, validator({
    id: { type: 'number', required: true }
}), findAddr, setDefaultAddr)

//获取地址列表
router.get('/', auth, findAddrList)

module.exports = router
