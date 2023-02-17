const {
    addrParamsFormateError, findAddrDataError
} = require('../constant/er.type')

const { findAddrData } = require('../service/addr.service')

const validator = (rules) => {
    if(rules.tel){
        rules.tel['format'] = /^1\d{10}$/
    }
    return async (ctx, next) => {
        try {
            ctx.verifyParams(rules)
        } catch (err) {
            return ctx.app.emit('error', addrParamsFormateError, ctx)
        }
        await next()
    }
}

//校验地址是否存在
const findAddr = async (ctx, next) => {
    try {
        const { id } = ctx.request.body
        const res = await findAddrData({ id });
        if (!res) {
            return ctx.app.emit('error', findAddrDataError, ctx)
        }
    } catch (err) {
        return ctx.app.emit('error', findAddrDataError, ctx)
    }
    await next()
}
module.exports = {
    validator, findAddr
}