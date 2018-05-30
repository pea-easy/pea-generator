let env = process.env.NODE_ENV || 'development';
let baseConfig = require('../config/config');
global.APP = {}; global.APP.config = require('../config/' + env);
global.APP.config = Object.assign(baseConfig, global.APP.config);
const InitPlugin = require('./middleware/pluginInit');
(async () => {
    try {
        InitPlugin();
    } catch (error) {
        /*eslint no-console: */
        console.log('...', error.stack);
    }

})();


// let quick-redis = require('quick-redis')

