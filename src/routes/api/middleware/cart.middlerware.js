const { getGoodsInfoById } = require('../service/goods.service');
const {
    addCartFormateError,
    goodsNotExist,
    marktableFalse,
    cartFormateError
} = require('../constant/er.type');

const validator = (rules) => {
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules);
        } catch (err) {
            return ctx.app.emit('error', cartFormateError, ctx)
        }
        await next()
    }
}

const checkGoodsById = async (ctx, next) => {
    try {
        const res = await getGoodsInfoById({ id: ctx.request.body.goods_id })
        if (!res) {//商品不存在
            return ctx.app.emit('error', goodsNotExist, ctx)
        } else if (res.deletedAt) {//商品已下架
            return ctx.app.emit('error', marktableFalse, ctx)
        }
    } catch (err) {
        return ctx.app.emit('error', addCartFormateError, ctx)
    }
    await next()
}

module.exports = {
    validator, checkGoodsById
}