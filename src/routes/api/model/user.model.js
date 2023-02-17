const { DataTypes } = require('sequelize');
const seq = require('../db/seq');

const User = seq.define('User', {
  // 在这里定义模型属性
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,//字段值是否允许为空，默认为true
    unique: true,//是否唯一
    comment: '用户名唯一'//字段备注
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, //默认为 true
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
    allowNull: false,
    comment: '是否为管理员， 0 不是 1是'//字段备注
  }
}, {
  // 这是其他模型参数
  // timestamps: true
});

//强制同步数据库- 删除已有的并创建新的数据表
// User.sync({force: true})
module.exports = User;