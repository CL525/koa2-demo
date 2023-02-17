const path = require('path');
const Router = require('@koa/router');
const router = new Router();
const { upload, create, getGoodsInfo, update, remove, changeMarktable, findGoodsList } = require('../controller/goods.controller');
const { auth, hadAdminpermission } = require('../middleware/auth.middlerware');
const { validator, getInfoValidator, marktableValidator, listValidator } = require('../middleware/goods.middlerware');
const { fileUpLoadConfig } = require('../middleware/file.middlerware');

//api/goods
router.prefix('/goods');

//api/goods/create 创建商品
router.post('/create', auth, hadAdminpermission, validator, create);
//api/goods/info 获取商品信息
router.get('/info', getInfoValidator, getGoodsInfo);
//api/goods/list 获取商品列表
router.get('/list', listValidator, findGoodsList);
//api/goods/:id 更新商品信息
router.put('/:id', validator, update);
//api/goods/:id 硬删除商品信息
router.delete('/:id', auth, hadAdminpermission, remove);
//api/goods/marktable 商品上下架(软删除)
router.post('/marktable', auth, hadAdminpermission, marktableValidator, changeMarktable);

//api/goods/upload 上传图片
router.post('/upload', auth, hadAdminpermission, fileUpLoadConfig, upload
);

module.exports = router;