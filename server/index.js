const Koa = require('koa')
// const bodyParser = require('koa-bodyparser')
const { koaBody } = require('koa-body')
const { PRIVATE_KEY } = require('./config/encryption_config')
const path = require('path')

const authRouter = require('./routes/auth')
const blogsRouter = require('./routes/blogs')
const fileRouter = require('./routes/file')
const categoryRouter = require('./routes/category')

const app = new Koa()
app.keys = [PRIVATE_KEY]

app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '/uploads'), // 设置上传目录
      keepExtensions: true, // 保持文件扩展名
    }
  })
);
// app.use(bodyParser());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());
app.use(blogsRouter.routes());
app.use(blogsRouter.allowedMethods());
app.use(fileRouter.routes());
app.use(fileRouter.allowedMethods());
app.use(categoryRouter.routes());
app.use(categoryRouter.allowedMethods());


module.exports = app.callback();


