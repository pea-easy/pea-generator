
var _ = require('lodash');

exports.generatePlugin = function (params) {
    return function (obj) {
        var mongo = {};
        var redis = {};
        let development = _.template(obj.fs.read(obj.templatePath('config/development.js')));
        let plugin =  _.template(obj.fs.read(obj.templatePath('config/plugin.js')));
        if (params.database === 'mongodb' && !params.redis) {
            mongo.plugin = {
                enable: true,
                package: 'pea-mongoose'
            };
            development = _.template(obj.fs.read(obj.templatePath('config/mongo.js')));
        
            mongo.config = {
                host: '127.0.0.1',
                port: 27017
            };
            
        }
        if (params.redis) {
            redis.plugin = {
                enable: true,
                package: 'pea-redis'
            };
            redis.config = {
                host: '127.0.0.1'
            };
        }
        obj.fs.write(obj.destinationPath('config/config.js'), development({
            mongo: mongo.config,
            redis: redis.config,
            project_name: params.dirname
        }));
        obj.fs.write(obj.destinationPath('config/plugin.js'), plugin({
            mongo: mongo.plugin,
            redis: redis.plugin,
            project_name: params.dirname
        }));
    
    };

   




};