const { createOrUpData, findCarts, upCartData, removeCarts, selectAllCarts } = require('../service/cart.service');
const { addCartError, getCartListError, upCartDataError, upCartDataParamsError, deleteCartDataError, selectAllCartDataNull, selectAllCartDataError } = require('../constant/er.type');
class CartController {
  async add(ctx, next) {
    let { goods_id, quantity } = ctx.request.body;
    let user_id = ctx.state.user.id;
    try {
      const res = await createOrUpData({ user_id, goods_id, quantity });
      if (res.dataValues) {
        ctx.body = {
          code: 1,
          message: '成功加入购物车',
          results: [res.dataValues]
        }
      } else {
        ctx.app.emit('error', addCartError, ctx);
      }
    } catch (err) {
      ctx.app.emit('error', addCartError, ctx);
    }
  }

  async getList(ctx, next) {
    let user_id = ctx.state.user.id;
    try {
      const res = await findCarts({ user_id });
      if (res) {
        ctx.body = {
          code: 1,
          message: '获取购物车列表成功',
          results: [res]
        }
      } else {
        ctx.app.emit('error', getCartListError, ctx);
      }
    } catch (err) {
      ctx.app.emit('error', getCartListError, ctx);
    }
  }

  async upData(ctx, next) {
    const user_id = ctx.state.user.id
    const { goods_id, selected, quantity } = ctx.request.body
    //参数不能同时为空
    if (selected === undefined && quantity === undefined) {
      return ctx.app.emit('error', upCartDataParamsError, ctx);
    }
    try {
      const res = await upCartData({ user_id, goods_id, selected, quantity });
      if (res) {
        ctx.body = {
          code: 1,
          message: '更新购物车数据成功',
          results: [res]
        }
      } else {
        ctx.app.emit('error', upCartDataError, ctx);
      }
    } catch (err) {
      ctx.app.emit('error', upCartDataError, ctx);
    }
  }

  async remove(ctx, next) {
    const { goods_ids } = ctx.request.body
    const user_id = ctx.state.user.id
    //参数值不能为空数组
    if (goods_ids.length == 0) {
      return ctx.app.emit('error', upCartDataParamsError, ctx)
    }
    try {
      const res = await removeCarts({ goods_ids, user_id })
      if (res) {
        ctx.body = {
          code: 1,
          message: '删除购物车商品成功',
          results: []
        }
      } else {
        ctx.app.emit('error', deleteCartDataError, ctx)
      }
    } catch (e) {
      ctx.app.emit('error', deleteCartDataError, ctx)
    }
  }

  async selectAll(ctx, next) {
    const { selected } = ctx.request.body
    const user_id = ctx.state.user.id
    try {
      const res = await selectAllCarts({ selected, user_id })
      if (res > 0) {
        ctx.body = {
          code: 1,
          message: selected ? '全选成功' : '全不选成功',
          results: []
        }
      } else {
        ctx.app.emit('error', selectAllCartDataNull, ctx)
      }
    } catch (e) {
      ctx.app.emit('error', selectAllCartDataError, ctx)
    }
  }
}

module.exports = new CartController();