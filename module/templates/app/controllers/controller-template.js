
let <%- name %>Service = require('../service/<%- name %>-service');

exports.<%- name %> = async (ctx) => {
    try {
        let result = await <%- name %>Service.<%- name %>({});
        ctx.body = result;
    } catch (error) {
        ctx.body = error.toString();
    }
};

