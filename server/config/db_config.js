module.exports = {
  MYSQL_CON:{
    base: {
      host: 'localhost',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
      dialectOptions: {
        // 设置 sql_mode，去掉 only_full_group_by
        options: {
          sql_mode: 'traditional',
        },
      },
    },
    conf: ['blogs', 'root', '123456']
  }
}
