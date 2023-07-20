const seq = require('./connections/mysql_connect');

require('./models')

// 测试连接
seq.authenticate().then(() => {
  console.log('数据库连接成功')
}).catch(err => {
  console.log('数据库连接失败')
})

// 同步数据库表
seq.sync({
  force: false, // true 同步并重置（清空）表数据
}).then(() => {
  console.log('数据库表同步成功')
  // 关闭
  process.exit();
})
