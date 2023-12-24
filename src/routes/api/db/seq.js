const { Sequelize } = require('sequelize');
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB
} = require('../../../config/config.default');

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
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