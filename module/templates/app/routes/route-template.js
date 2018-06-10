const router = require('koa-router')();
let <%- name %>Ctrl = require('../controller/<%- name %>-ctrl');
router.prefix('/<%- name %>');



router.get('/<%- name %>', <%- name %>Ctrl.<%- name %>);
module.exports = router;
