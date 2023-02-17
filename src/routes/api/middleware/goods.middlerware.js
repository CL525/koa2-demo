const { goodsFormatError, marktableFormatError, goodsListFormatError } = require('../constant/er.type')

const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            goods_name: { type: 'string', required: true },
            goods_price: { type: 'number', required: true },
            goods_num: { type: 'number', required: true },
            goods_img: { type: 'string', required: true },
        })
    } catch (err) {
        return ctx.app.emit('error', goodsFormatError, ctx)
    }
    await next()
}

const getInfoValidator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            id: { type: 'string', required: true },
        })
    } catch (err) {
        return ctx.app.emit('error', goodsFormatError, ctx)
    }
    await next()
}

const marktableValidator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            id: { type: 'number', required: true },
            marktable: { type: 'boolean', required: true },
        })
    } catch (err) {
        return ctx.app.emit('error', marktableFormatError, ctx)
    }
    await next()
}

const listValidator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            pageNum: { type: 'string', required: true },
            pageSize: { type: 'string', required: true },
        })
    } catch (err) {
        return ctx.app.emit('error', goodsListFormatError, ctx)
    }
    await next()
}

module.exports = {
    validator, getInfoValidator, marktableValidator, listValidator
}