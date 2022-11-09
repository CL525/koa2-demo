const { Op } = require('sequelize')
const Cart = require('../model/cart.model')
const Goods = require('../model/goods.model')

class CartService {
    async createGoods({ goods_name, goods_price, goods_num, goods_img }) {
        const res = await Cart.create({ goods_name, goods_price, goods_num, goods_img });
        return res ? res.dataValues : null;
    }
    async getGoodsInfoById({ id }) {
        const whereOpt = {};
        id && Object.assign(whereOpt, { id });
        const res = await Cart.findOne({
            attributes: ['id', 'goods_name', 'goods_price', 'goods_num', 'goods_img', 'deletedAt'],
            where: whereOpt,
            paranoid: false,//查询出被软删除的记录
        });
        return res ? res.dataValues : null;
    }
    async createOrUpData({ user_id, goods_id, quantity = 1 }) {
        let res = await Cart.findOne({
            where: {
                [Op.and]: { user_id, goods_id }
            }
        });
        if (res) {//购物车中商品已经存在
            // await res.increment('quantity', { by: quantity })
            // return await res.reload()
            res.quantity += quantity
            res.selected = true
            return await res.save();
        } else {
            return await Cart.create({ user_id, goods_id, quantity, selected: true })
        }
    }

    async findCarts({ user_id }) {
        const { count, rows } = await Cart.findAndCountAll({
            attributes: ['goods_id', 'selected', 'quantity'],
            where: { user_id },
            include: {
                model: Goods,
                as: 'goods_info',
                attributes: ['goods_name', 'goods_num', 'goods_price', 'goods_img', 'deletedAt'],
                paranoid: false,//查询出被软删除的记录
            }
        });
        return {
            toatal_count: count, list: rows
        }
    }

    async upCartData({ user_id, goods_id, selected, quantity }) {
        // const res = await Cart.findByPk(1);// 通过主键查询
        const res = await Cart.findOne({
            attributes: ['id', 'goods_id', 'selected', 'quantity'],
            where: {
                [Op.and]: { user_id, goods_id }
            },
            include: {
                model: Goods,
                as: 'goods_info',
                attributes: ['goods_name', 'goods_num', 'goods_price', 'goods_img', 'deletedAt'],
                paranoid: false,//查询出被软删除的记录
            }
        });
        if (!res) return ''
        selected === undefined ? '' : res.selected = selected
        quantity === undefined ? '' : res.quantity = quantity
        return await res.save()
    }
    async removeCarts({ goods_ids, user_id }) {
        return await Cart.destroy({
            attributes: ['user_id', 'goods_id'],
            where: {
                // [Op.and]: {
                //     user_id,
                //     goods_id: goods_ids
                // }
                user_id,
                goods_id: goods_ids
            },
            force: true
        })
    }

    async selectAllCarts({ selected, user_id }) {
        console.log(selected, user_id)
        const res = await Cart.update({ selected }, {
            where: {
                user_id
            },
            force: true
        })
        return res && res[0] || 0;
    }
}


module.exports = new CartService();