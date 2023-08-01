const seq = require('../connections/mysql_connect'),
  { STRING, INT_UNSIGNED, INT } = require('../../config/db_type_config');

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
  openCount: {
    comment: '文章公开数量',
    type: INT,
    defaultValue: 0,
  },
  count: {
    comment: '文章总数量',
    type: INT,
    defaultValue: 0,
  },
})

module.exports = SyaCategory
