const router = require('koa-router')();
let userCtrl = require('../controller/user-ctrl');
router.prefix('/user');



router.get('/getUser/:id', userCtrl.getUser);
module.exports = router;
