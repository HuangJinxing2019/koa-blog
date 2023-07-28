const seq = require('../connections/mysql_connect'),
  { STRING, INT_UNSIGNED } = require('../../config/db_type_config');

const SyaCategory = seq.define('sys_category', {
  id: {
    comment: 'ID',
    type: INT_UNSIGNED,
    primaryKey: true,  // 主键
    autoIncrement: true, // 自增属性
  },
  name: {
    comment: '分类名称',
    type: STRING(12),
  },
  imgUrl: {
    comment: '图片路径',
    type: STRING,
  },
  creator: {
    comment: '创建者 sys_user account',
    type: STRING(11),
  },
  remark: {
    comment: '备注',
    type: STRING(64),
  },
})

module.exports = SyaCategory
