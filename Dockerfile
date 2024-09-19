# 使用官方的 Node.js 镜像
FROM node:16.17.1

# 设置工作目录
WORKDIR /usr/app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./
# 设置 node 阿里镜像
RUN npm config set registry https://npmmirror.com/mirrors/node

# 安装项目依赖
RUN npm install

# 全局安装 PM2
RUN npm install -g pm2

# 复制所有项目文件到工作目录
COPY . .

# 暴露应用的端口
EXPOSE 3001

# 使用 PM2 启动应用
CMD ["pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]
