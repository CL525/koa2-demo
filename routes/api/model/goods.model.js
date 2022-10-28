const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const Goods = seq.define('Goods', {
  // 在这里定义模型属性
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,//字段值是否允许为空，默认为true
    unique: false,//是否唯一
    comment: '商品名'//字段备注
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
    allowNull: false,
    comment: '商品价格'//字段备注
  },
  goods_num: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: '商品数量'//字段备注
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false, //默认为 true
    comment: '商品图片的url'//字段备注
  },
}, {
  // 这是其他模型参数
  // timestamps: true
  paranoid: true
});

//强制同步数据库- 删除已有的并创建新的数据表
// Goods.sync({ force: true })
module.exports = Goods;