const seq = require('../connections/mysql_connect'),
  { STRING, INT, INT_UNSIGNED, DATEONLY } = require('../../config/db_type_config');

const SysUser = seq.define('sys_user', {
  id: {
    comment: 'ID',
    type: INT_UNSIGNED,
    primaryKey: true, // 主键
    autoIncrement: true, // 实现自增
  },
  openid: {
    comment: 'openid',
    type: STRING(8),
    unique: true,
  },
  nickname: {
    comment: '昵称',
    type: STRING(8),
    unique: true,
  },
  account: {
    comment: '登录账号',
    type: STRING(11),
    unique: true,
  },
  password: {
    comment: '登录密码',
    type: STRING,
  },
  email: {
    comment: '邮箱',
    allowNull: true,
    type: STRING
  },
  avatar: {
    comment: '用户头像',
    allowNull: true,
    type: STRING,
  },
  sex: {
    comment: '性别',
    allowNull: true,
    defaultValue: 0,
    type: INT(1),
  },
  birthday: {
    comment: '生日',
    allowNull: true,
    type: DATEONLY
  },
  job: {
    comment: '职位',
    allowNull: true,
    type: STRING
  },
  coverImage: {
    comment: '封面图片',
    allowNull: true,
    type: STRING
  }
})

module.exports = SysUser
