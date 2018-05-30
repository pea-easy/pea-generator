const router = require('koa-router')();
let userCtrl = require('../controllers/user-ctrl');
router.prefix('/users');



router.get('/getUser/:id', userCtrl.getUser);
module.exports = router;
