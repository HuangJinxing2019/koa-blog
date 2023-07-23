const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const { PRIVATE_KEY } = require('./config/encryption_config')

const authRouter = require('./routes/auth')
const blogsRouter = require('./routes/blogs')

const app = new Koa()

app.keys = [PRIVATE_KEY]
app.use(bodyParser());
app.use(authRouter.routes());
app.use(blogsRouter.routes());

module.exports = app.callback();


