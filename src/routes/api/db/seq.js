const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jdsc', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql' /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});

// sequelize
//     .authenticate()
//     .then(() => {
//         console.log('数据库连接成功')
//     })
//     .catch(() => {
//         console.log('数据库连接失败')
//     })

module.exports = sequelize;