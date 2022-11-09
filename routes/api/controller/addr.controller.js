const { createAddr, upAddrData, removeAddrData, setDefaultAddrData, findAddrListData } = require('../service/addr.service')
const { addrParamsFormateError, upAddrDataError, removeAddrDataError, setDefaultAddrDataError, findAddrListDataError } = require('../constant/er.type');
const { TableHints } = require('sequelize');

class AddrController {
    async create(ctx, next) {
        const { name, tel, province, city, district, addon_address } = ctx.request.body
        const user_id = ctx.state.user.id;
        try {
            const res = await createAddr({ name, tel, province, city, district, addon_address, user_id })
            if (res) {
                ctx.body = {
                    code: 1,
                    message: '成功加入购物车',
                    results: []
                }
            } else {
                ctx.app.emit('error', addrParamsFormateError, ctx)
            }
        } catch (e) {
            ctx.app.emit('error', addrParamsFormateError, ctx)
        }
    }

    async upAddr(ctx, next) {
        const { id, name, tel, province, city, district, addon_address } = ctx.request.body
        try {
            const res = await upAddrData({ id, name, tel, province, city, district, addon_address })
            if (res) {
                ctx.body = {
                    code: 1,
                    message: '更新地址信息成功',
                    results: []
                }
            } else {
                ctx.app.emit('error', upAddrDataError, ctx)
            }
        } catch (e) {
            ctx.app.emit('error', upAddrDataError, ctx)
        }
    }

    async deleteAddr(ctx, next) {
        const { id } = ctx.request.body
        try {
            const res = await removeAddrData({ id })
            if (res) {
                ctx.body = {
                    code: 1,
                    message: '删除地址成功',
                    results: []
                }
            } else {
                throw '数据库操作失败'
            }
        } catch (e) {
            ctx.app.emit('error', removeAddrDataError, ctx)
        }
    }

    async setDefaultAddr(ctx, next) {
        const { id } = ctx.request.body
        const user_id = ctx.state.user.id;
        try {
            const res = await setDefaultAddrData({ id, user_id })
            if (res) {
                ctx.body = {
                    code: 1,
                    message: '设置默认地址成功',
                    results: []
                }
            } else {
                throw '数据库操作失败'
            }
        } catch (e) {
            ctx.app.emit('error', setDefaultAddrDataError, ctx)
        }
    }

    async findAddrList(ctx, next) {
        const user_id = ctx.state.user.id;
        try {
            const res = await findAddrListData({ user_id })
            if (res) {
                ctx.body = {
                    code: 1,
                    message: '获取地址信息成功',
                    results: res
                }
            } else {
                throw '数据库操作失败'
            }
        } catch (e) {
            ctx.app.emit('error', findAddrListDataError, ctx)
        }
    }
}

module.exports = new AddrController();