const bcrypt = require('bcryptjs');
const { getUserInfo } = require('../service/user.service');
const {
    userFormateError,
    userAlreadyExited,
    userRegisterError,
    userDoesNotExist,
    userLoginError,
    invalidPassword,
} = require('../constant/er.type');

const userValidator = async (ctx, next) => {
    let { user_name, password } = ctx.request.body;
    if (!user_name || !password) {
        ctx.app.emit('error', userFormateError, ctx);
        return;
    }
    await next();
}

//合法性
const verifyUser = async (ctx, next) => {
    let { user_name } = ctx.request.body;
    try {
        const res = await getUserInfo({ user_name });
        if (res) {
            ctx.app.emit('error', userAlreadyExited, ctx);
            return
        }
    } catch (err) {
        ctx.app.emit('error', userRegisterError, ctx);
        return
    }
    await next();
}

//密码加盐加密
const cryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body;
    const salt = bcrypt.genSaltSync(10);
    ctx.request.body.password = bcrypt.hashSync(password, salt);
    await next();
}

//登陆验证
const verifyLogin = async (ctx, next) => {
    let { user_name, password } = ctx.request.body;
    try {
        const res = await getUserInfo({ user_name });
        //判断用户是否存在
        if (!res) {
            ctx.app.emit('error', userDoesNotExist, ctx);
            return
        }
        //密码解密对比
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error', invalidPassword, ctx);
            return
        }
    } catch (err) {
        ctx.app.emit('error', userLoginError, ctx);
        return
    }
    await next();
}

module.exports = {
    userValidator, verifyUser, cryptPassword, verifyLogin
}