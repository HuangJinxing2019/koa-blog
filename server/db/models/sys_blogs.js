const seq = require('../connections/mysql_connect'),
  { STRING, INT_UNSIGNED, TEXT, BOOLEAN, INT, VIRTUAL } = require('../../config/db_type_config');

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
  snippet: {
    comment: '文章摘要',
    type: STRING(100),
  },
  status: {
    comment: '状态 0草稿， 1发布',
    defaultValue: 0,
    type: INT(1),
  },
  open: {
    comment: '是否公开',
    defaultValue: true,
    type: BOOLEAN,
  },
  creator: {
    comment: '创建者',
    type: STRING(11),
  },
  // 虚拟字段
  labelList: {
    comment: '虚拟字段，装在标签数组对象',
    type: VIRTUAL,
  }
})
module.exports = SysBlogs
