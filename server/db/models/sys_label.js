const seq = require('../connections/mysql_connect'),
  { STRING, INT_UNSIGNED } = require('../../config/db_type_config');

const SysLabel = seq.define('sys_label', {
  id: {
    comment: 'ID',
    type: INT_UNSIGNED,
    primaryKey: true, // 主键
    autoIncrement: true, // id自增属性
  },
  name: {
    comment: '标签名称',
    type: STRING(12),
  },
  creator: {
    comment: '创建者',
    type: STRING(11),
  },
  remark: {
    comment: '备注',
    type: STRING(64),
  },
})

module.exports = SysLabel;
