const Koa = require('koa')
const app = new Koa();
const router = require('./router');
const bodyParser = require('koa-bodyparser');
app.use(async (ctx, next) => {
        await next();
        const rt = ctx.response.get('X-Response-Time');
        console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});
// x-response-time
app.use(async (ctx, next) => {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        ctx.set('X-Response-Time', `${ms}ms`);
});
app.use(bodyParser())
app.use(router.routes());
app.listen(3000)