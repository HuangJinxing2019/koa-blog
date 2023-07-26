const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { PRIVATE_KEY } = require('./config/encryption_config')

const authRouter = require('./routes/auth')
const blogsRouter = require('./routes/blogs')
const fileRouter = require('./routes/file')

const app = new Koa()

app.keys = [PRIVATE_KEY]
app.use(bodyParser());

app.use(authRouter.routes());
app.use(authRouter.allowedMethods());
app.use(blogsRouter.routes());
app.use(blogsRouter.allowedMethods());
app.use(fileRouter.routes());
app.use(fileRouter.allowedMethods());

module.exports = app.callback();


