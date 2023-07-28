const seq = require('../connections/mysql_connect'),
  { STRING, INT_UNSIGNED, TEXT, BOOLEAN, INT } = require('../../config/db_type_config');

const SysBlogs = seq.define('sys_blogs', {
  id: {
    comment: 'ID',
    type: INT_UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryId: {
    comment: '分类ID',
    type: INT_UNSIGNED,
  },
  title: {
    comment: '博客标题',
    type: STRING(32),
    unique: true, // 不能重复
  },
  mainImgUrl: {
    comment: '封面图片',
    type: STRING,
  },
  labelIds: {
    comment: '标签',
    type: STRING,
    allowNull: true,
  },
  content: {
    comment: '博客内容，Markdown文本',
    type: TEXT,
    allowNull: true,
  },
  status: {
    comment: '状态 1启用， 2关闭',
    type: INT(1),
  },
  open: {
    comment: '是否公开',
    type: BOOLEAN,
  },
  creator: {
    comment: '创建者',
    type: STRING(11),
  }
})
module.exports = SysBlogs
