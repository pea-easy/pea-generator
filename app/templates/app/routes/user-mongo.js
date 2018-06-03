const router = require('koa-router')();
let userCtrl = require('../controllers/user-ctrl');
router.prefix('/user');



router.get('/getUser/:id', userCtrl.getUser);
router.post('/saveUser', userCtrl.saveUser);
module.exports = router;
