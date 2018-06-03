
var _ = require('lodash');

exports.generatePlugin = function (params) {
    return function (obj) {
        let development = _.template(obj.fs.read(obj.templatePath('config/development.js')));
        let plugin =  _.template(obj.fs.read(obj.templatePath('config/plugin.js')));
        if (params.database === 'mongodb' && !params.redis) {
            // obj.pkg.dependencies['pea-mongoose'] = '0.0.1';
            development = _.template(obj.fs.read(obj.templatePath('config/development-mongo.js')));
            // plugin =  _.template(obj.fs.read(obj.templatePath('config/plugin-mongo.js')));
        }
        if (params.redis && params.database != 'mongodb') {
            obj.pkg.dependencies['pea-redis'] = '0.0.1';
            development = _.template(obj.fs.read(obj.templatePath('config/development-redis.js')));
            plugin =  _.template(obj.fs.read(obj.templatePath('config/plugin-redis.js')));
        }
        if (params.redis && params.database === 'mongodb') {
            obj.pkg.dependencies['pea-redis'] = '0.0.1';
            // obj.pkg.dependencies['pea-mongoose'] = '0.0.1';
            development = _.template(obj.fs.read(obj.templatePath('config/development-mongo-redis.js')));
            // plugin =  _.template(obj.fs.read(obj.templatePath('config/plugin-mongo-redis.js')));
        }
        obj.fs.write(obj.destinationPath('config/development.js'), development({
            project_name: params.dirname
        }));
        obj.fs.write(obj.destinationPath('config/plugin.js'), plugin({
            project_name: params.dirname
        }));
        obj.fs.writeJSON(obj.destinationPath('package.json'), obj.pkg);
    };

   




};