const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const Goods = require('./goods.model')

const Cart = seq.define('Cart', {
  user_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: '用户id'//字段备注
  },
  // 在这里定义模型属性
  goods_id: {
    type: DataTypes.INTEGER,
    allowNull: false,//字段值是否允许为空，默认为true
    unique: false,//是否唯一
    comment: '商品id'//字段备注
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
    comment: '商品数量'//字段备注
  },
  selected: {
    type: DataTypes.BOOLEAN,
    allowNull: 1, //默认为 1 true
    defaultValue: true,
    comment: '商品选中状态'//字段备注
  },
}, {
  // 这是其他模型参数
  // timestamps: true
  paranoid: true
});

Cart.belongsTo(Goods, {
  foreignKey: 'goods_id',
  as: 'goods_info'
})

//强制同步数据库- 删除已有的并创建新的数据表
// Cart.sync({ force: true })
module.exports = Cart;