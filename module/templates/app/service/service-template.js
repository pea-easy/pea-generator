let validate= require('./validate/validate-<%- name %>');

class  <%- name %>Service {

    static async <%- name %>(condition) {
        await validate.<%- name %>(condition);
        return {name:'<%- name %>'};
    }


}

module.exports =  <%- name %>Service;