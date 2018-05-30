const router = require('koa-router')();
router.get('/', async (ctx) => {
    ctx.body = { name: 'Hello World '};
});

module.exports = router;
