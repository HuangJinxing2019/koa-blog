const seq = require('../connections/mysql_connect'),
  { INT_UNSIGNED, INT } = require('../../config/db_type_config');

const SysBlogs = seq.define('sys_blogs_label', {
  id: {
    comment: 'ID',
    type: INT_UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  blogsId: {
    comment: '博客ID',
    type: INT,
  },
  labelId: {
    comment: '标签ID',
    type: INT,
  }
})
module.exports = SysBlogs
