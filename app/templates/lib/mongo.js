
/**
 * A custom library to establish a database connection
 */
'use strict';
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var db = function() {
    return {

        /**
         * Open a connection to the database
         * @param conf
         */
        connect: function(conf) {
            console.log('config',conf);
            conf.host = conf.host || '127.0.0.1';
            var  uri = 'mongodb://' + conf.host + '/' + conf.database;
            var opts = conf.options;
            mongoose.connect(uri,opts);
            var db = mongoose.connection;
            /*eslint no-console: */
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function callback() {
                console.log('db connection open');
            });
        }
    };
};

module.exports = db();
