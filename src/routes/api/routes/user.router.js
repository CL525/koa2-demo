const Router = require('@koa/router');
const router = new Router();
const { register, login, changePassword } = require('../controller/user.controller');
const { userValidator, verifyUser, cryptPassword, verifyLogin } = require('../middleware/user.middlerware');
const { auth } = require('../middleware/auth.middlerware');
//api/user
router.prefix('/user');

//api/user/register 注册接口
router.post('/register', userValidator, verifyUser, cryptPassword, register);

//api/user/login 登陆接口
router.post('/login', userValidator, verifyLogin, login);

//api/user/changePassword 修改密码
router.patch('/changePassword', auth, cryptPassword, changePassword);

module.exports = router;