const Goods = require('../model/goods.model');

class GoodsService {
    async createGoods({ goods_name, goods_price, goods_num, goods_img }) {
        const res = await Goods.create({ goods_name, goods_price, goods_num, goods_img });
        return res ? res.dataValues : null;
    }
    async getGoodsInfoById({ id }) {
        const whereOpt = {};
        id && Object.assign(whereOpt, { id });
        const res = await Goods.findOne({
            attributes: ['id', 'goods_name', 'goods_price', 'goods_num', 'goods_img', 'deletedAt'],
            where: whereOpt,
            paranoid: false,//查询出被软删除的记录
        });
        return res ? res.dataValues : null;
    }
    async updateGoods({ id, goods_name, goods_price, goods_num, goods_img }) {
        const whereOpt = { id };
        const newGoods = {};
        goods_name && Object.assign(newGoods, { goods_name });
        goods_price && Object.assign(newGoods, { goods_price });
        goods_num && Object.assign(newGoods, { goods_num });
        goods_img && Object.assign(newGoods, { goods_img });
        const res = await Goods.update(newGoods, { where: whereOpt });
        return res ? res[0] : 0
    }
    async removeGoods({ id, force = false }) {
        const whereOpt = { id };
        //force: true - 强制删除, false 软删除 -下架商品
        const res = await Goods.destroy({ where: whereOpt, force });
        return res
    }

    async restoreGoods({ id }) {
        const whereOpt = { id };
        //上架商品
        const res = await Goods.restore({ where: whereOpt });
        return res
    }

    async findGoods(pageNum = 1, pageSize = 10) {
        const offset = (pageNum - 1) * pageSize;
        // const count = await Goods.count();
        // const rows = await Goods.findAll({ offset, limit: pageSize * 1 });
        const { count, rows } = await Goods.findAndCountAll({ offset, limit: pageSize * 1 });
        return {
            pageNum, pageSize, total: count, list: rows
        }
    }

}


module.exports = new GoodsService();