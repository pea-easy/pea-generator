var Generator = require('yeoman-generator');
let Banner = require('../util/banner');
var mkdirp = require('mkdirp');
var path = require('path');
var _ = require('lodash');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.option('babel');
    }
    initializing() {
        this.options = {};
        Banner();
    }
    dir() {
       
        if (this.options.createDirectory !== undefined) {
            return true;
        }

        const prompt = [{
            type: 'confirm',
            name: 'createDirectory',
            message: 'Would you like to create a new directory for your project?',
        }];

        return this.prompt(prompt).then((response) => {
            this.options.createDirectory = response.createDirectory;
        });
    }
    dirname() {
        if (!this.options.createDirectory || this.options.dirname) {
            return true;
        }

        const prompt = [{
            type: 'input',
            name: 'dirname',
            message: 'Enter directory name',
        }];

        return this.prompt(prompt).then((response) => {
            this.options.dirname = response.dirname;
        });
    }

    database() {
        if (this.options.database) {
            return true;
        }

        const prompt = [{
            type: 'list',
            name: 'database',
            message: 'Select a database to use:',
            choices: [
                'None',
                'MongoDB',
                'MySQL',
                'PostgreSQL'
            ],
            store: true,
        }];
        return this.prompt(prompt).then((response) => {
            this.options.database = response.database.toLowerCase();
        });
    }


    writing() {
        if (this.options && this.options.createDirectory && this.options.dirname) {
            this.destinationRoot(this.options.dirname);
        } else {
            this.options.dirname = path.basename(this.destinationRoot());
        }
        // this.destinationRoot(this.options.dirname);
        // this.destinationRoot();
        // this.(path.join(__dirname, 'template'));



        mkdirp('lib');
        mkdirp('lib/middleware');

        this.fs.copy(
            this.templatePath('./lib/middleware/pluginInit.js'),
            this.destinationPath('./lib/middleware/pluginInit.js')
        );
        this.fs.copy(
            this.templatePath('./lib/middleware/responseJSON.js'),
            this.destinationPath('./lib/middleware/responseJSON.js')
        );

        mkdirp('app/controllers');
        this.fs.copy(
            this.templatePath('app/controllers/user-ctrl.js'),
            this.destinationPath('app/controllers/user-ctrl.js')
        );
        mkdirp('app/dao');
        mkdirp('app/routes');
        mkdirp('app/routes/apiguide');
        this.fs.copy(
            this.templatePath('app/routes/index.js'),
            this.destinationPath('app/routes/index.js')
        );
        this.fs.copy(
            this.templatePath('app/routes/user.js'),
            this.destinationPath('app/routes/user.js')
        );
        this.fs.copy(
            this.templatePath('app/routes/apiguide/user.js'),
            this.destinationPath('app/routes/apiguide/user.js')
        );
        mkdirp('app/service');
        mkdirp('app/service/validate');
        this.fs.copy(
            this.templatePath('app/service/validate/validate-user.js'),
            this.destinationPath('app/service/validate/validate-user.js')
        );

        mkdirp('config');
        var loggerIndexTmpl = _.template(this.fs.read(this.templatePath('config/config.js')));
        this.fs.write(this.destinationPath('config/config.js'), loggerIndexTmpl({
            project_name: this.options.dirname
        }));

        mkdirp('public');


        this.fs.copy(
            this.templatePath('app/routes/apiguide/user.js'),
            this.destinationPath('app/routes/apiguide/user.js')
        );
        



    }
};