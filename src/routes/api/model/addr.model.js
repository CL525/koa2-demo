const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const Addr = seq.define('Addr', {
  user_id: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    comment: '用户id'//字段备注
  },
  name: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
    comment: '收货人'//字段备注
  },
  // 在这里定义模型属性
  tel: {
    type: DataTypes.CHAR(11),
    allowNull: false,//字段值是否允许为空，默认为true
    unique: false,//是否唯一
    comment: '手机号'//字段备注
  },
  province: {
    type: DataTypes.STRING,
    defaultValue: '',
    allowNull: false,
    comment: '省'//字段备注
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false, //默认为 1 true
    comment: '市'//字段备注
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '区'//字段备注
  },
  addon_address: {
    type: DataTypes.STRING,
    allowNull: false, //默认为 1 true
    comment: '详细地址'//字段备注
  },
  default: {
    type: DataTypes.BOOLEAN,
    allowNull: false, //默认为 1 true
    defaultValue: 0,
    comment: '默认地址'//字段备注
  }
}, {
  // 这是其他模型参数
  // timestamps: true
  paranoid: true
});

// 强制同步数据库- 删除已有的并创建新的数据表
// Addr.sync({ force: true })
module.exports = Addr;