module.exports = {
  app: [
    {
      name: 'nuxt_koa2_blogs',// 项目名称
      script: 'server/index.js', // 程序执行入口文件
      env: {
        COMMON_VARIABLE: 'true'
      },
      evn_production: {
        NODE_ENV: 'production'
      }
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: '192.168.1.231',
      ref: 'origin/main', // git仓库分支
      repo: 'https://github.com/HuangJinxing2019/koa-blog.git', // 仓库地址
      path: '/www/blog', // 部署到服务器的目录地址
      'pre-deploy': 'git fetch --all',
      // 下载依赖，项目打包，启动项目，pm2检查是否启动，如未启动重新执行一边
      'post-deploy': 'npm install && npm run build && npm start && pm2 startOrRestart deploy.config.js --env production'
    }
  }
}
