class UserController {
  async register(ctx, next) {
    console.log('首页3');
    ctx.session.usename = "张三";
    let { a } = ctx.query
    ctx.body = {
      status: a == 1 ? 1 : -1,
      results: [{
        a: '11'
      }]
    }
  }
}

module.exports = UserController;