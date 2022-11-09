const { Op } = require('sequelize')
const Addr = require('../model/addr.model')

class AddrService {
    async createAddr({ name, tel, province, city, district, addon_address, user_id }) {
        const res = await Addr.create({ name, tel, province, city, district, addon_address, user_id });
        return res ? res.dataValues : null;
    }

    async upAddrData({ id, name, tel, province, city, district, addon_address }) {
        const res = await Addr.update({ name, tel, province, city, district, addon_address }, {
            where: { id },
            force: true
        });
        return res && res[0] || 0
    }

    async removeAddrData({ id }) {
        const res = await Addr.destroy({
            where: { id },
            force: true
        })
        return res;
    }

    async setDefaultAddrData({ id, user_id }) {
        await Addr.update({ default: 0 }, {
            where: {
                [Op.and]: { default: 1, user_id }
            },
            force: true
        });

        const res = await Addr.update({ default: 1 }, {
            where: { id },
            force: true
        })
        return res && res[0] || 0
    }

    async findAddrData({ id }) {
        const res = await Addr.findOne({
            where: { id }
        })
        return res && res.dataValues || null
    }

    async findAddrListData({ user_id }) {
        const res = await Addr.findAll({
            attributes: ["id", "name", "tel", "province", "city", "district", "addon_address", "default"],
            where: { user_id }
        })
        return res
    }
}


module.exports = new AddrService();