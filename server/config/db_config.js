module.exports = {
  MYSQL_CON:{
    base: {
      host: 'localhost',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      }
    },
    conf: ['blogs', 'root', '123456']
  }
}
