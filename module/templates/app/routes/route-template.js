const router = require('koa-router')();
let <%- name %>Ctrl = require('../controllers/<%- name %>-ctrl');
router.prefix('/<%- name %>');



router.get('/', <%- name %>Ctrl.<%- name %>);
module.exports = router;
