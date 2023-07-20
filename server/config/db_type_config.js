const Sequelize = require('sequelize')
module.exports = {
  // 字符串类型
  STRING: Sequelize.STRING,
  // Int 类型
  INT: Sequelize.INTEGER,
  // 文本类型
  TEXT: Sequelize.TEXT,
  //小数类型
  DECIMAL: Sequelize.DECIMAL,
  // 无符号类型，用于id自增属性
  INT_UNSIGNED: Sequelize.INTEGER.UNSIGNED,
  DATEONLY: Sequelize.DATEONLY,
}
