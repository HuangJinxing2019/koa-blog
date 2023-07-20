const { Sequelize } = require('sequelize'),
  { MYSQL_CON } = require('../../config/db_config');

const sql = new Sequelize(...MYSQL_CON.conf, MYSQL_CON.base);
module.exports = sql;
