const { createUser, getUserInfo, updateById } = require('../service/user.service');
const jwt = require('jsonwebtoken');

const { userRegisterError, userLoginError, changePasswordError } = require('../constant/er.type');
class UserController {
  async register(ctx, next) {
    let { user_name, password } = ctx.request.body;
    try {
      const res = await createUser(user_name, password);
      if (res) {
        ctx.body = {
          code: 1,
          message: '注册成功',
          results: {
            id: res.id,
            user_name: res.user_name
          }
        }
      } else {
        ctx.app.emit('error', userRegisterError, ctx);
      }
    } catch (err) {
      ctx.app.emit('error', userRegisterError, ctx);
    }
  }

  async login(ctx, next) {
    let { user_name, password } = ctx.request.body;
    try {
      const { password, ...res } = await getUserInfo({ user_name });
      ctx.body = {
        code: 1,
        message: '登陆成功',
        results: [{
          token: jwt.sign(res, 'jdsc', { expiresIn: '1d' })
        }]
      }
    } catch (err) {
      ctx.app.emit('error', userLoginError, ctx);
    }
  }

  async changePassword(ctx, next) {
    const { id } = ctx.state.user;
    const { password } = ctx.request.body;
    try {
      let res = await updateById({ id, password });
      if (res) {
        ctx.body = {
          code: 1,
          message: '修改成功',
          results: []
        }
      } else {
        ctx.app.emit('error', changePasswordError, ctx);
      }
    } catch (err) {
      ctx.app.emit('error', changePasswordError, ctx);
    }
  }
}

module.exports = new UserController();