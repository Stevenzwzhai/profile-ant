const Router = require('koa-router');
const crypto = require('crypto')
const router = new Router();
const fs = require('fs');
const Bluebird = require('bluebird');
const profiler = require('v8-profiler-node8');

router.get('/encript', async(ctx, next) => {
    const password = ctx.query.password || 'test'
    const salt = crypto.randomBytes(128).toString('base64')
    const encryptedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    ctx.body = encryptedPassword;
    await next;
});

router.get('/cpuprofile', async (ctx, next) => {
    //Start Profiling
    profiler.startProfiling('CPU profile');
    await Bluebird.delay(30000);
    //Stop Profiling after 30s
    const profile = profiler.stopProfiling();
    profile.export()
        .pipe(fs.createWriteStream(`cpuprofile-${Date.now()}.cpuprofile`))
        .on('finish', () => profile.delete());
    ctx.status = 204
    console.log(123123123);
    await next;
})
module.exports = router;