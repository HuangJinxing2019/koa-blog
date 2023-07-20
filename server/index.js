const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const authRouter = require('./routes/auth')
const blogsRouter = require('./routes/blogs')

const app = new Koa()

app.use(bodyParser());
app.use(authRouter.routes());
app.use(blogsRouter.routes());

module.exports = app.callback();


