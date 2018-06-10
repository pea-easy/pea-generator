var Generator = require('yeoman-generator');
let Banner = require('../util/banner');
var mkdirp = require('mkdirp');
var path = require('path');
var _ = require('lodash');
var extend = require('deep-extend');
var plugin = require('./plugin');

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
                'MongoDB'
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
        mkdirp('.core');

        this.fs.copy(
            this.templatePath('.core/initConfig.js'),
            this.destinationPath('.core/initConfig.js')
        );

        this.fs.copy(
            this.templatePath('.core/initPlugin.js'),
            this.destinationPath('.core/initPlugin.js')
        );

        this.fs.copy(
            this.templatePath('.core/index.js'),
            this.destinationPath('.core/index.js')
        );


        mkdirp('lib');
        mkdirp('lib/middleware');

        this.fs.copy(
            this.templatePath('./lib/middleware/responseJSON.js'),
            this.destinationPath('./lib/middleware/responseJSON.js')
        );
      

        if(this.options.database === 'mongodb'){
            mkdirp('app/controllers');
            this.fs.copy(
                this.templatePath('app/controllers/user-mongo-ctrl.js'),
                this.destinationPath('app/controllers/user-ctrl.js')
            );
            this.fs.copy(
                this.templatePath('./lib/spec-mongo.js'),
                this.destinationPath('./lib/spec.js')
            );
            mkdirp('app/dao');
            this.fs.copy(
                this.templatePath('app/dao/user-mongo-dao.js'),
                this.destinationPath('app/dao/user-dao.js')
            );
            mkdirp('app/routes');
            this.fs.copy(
                this.templatePath('app/routes/index.js'),
                this.destinationPath('app/routes/index.js')
            );
            this.fs.copy(
                this.templatePath('app/routes/user-mongo.js'),
                this.destinationPath('app/routes/user.js')
            );
          
            mkdirp('app/service');
            mkdirp('app/service/validate');
            this.fs.copy(
                this.templatePath('app/service/validate/validate-mongo-user.js'),
                this.destinationPath('app/service/validate/validate-user.js')
            );
            this.fs.copy(
                this.templatePath('app/service/user-mongo-server.js'),
                this.destinationPath('app/service/user-server.js')
            );
        }else{
            mkdirp('app/controllers');
            this.fs.copy(
                this.templatePath('app/controllers/user-ctrl.js'),
                this.destinationPath('app/controllers/user-ctrl.js')
            );
            mkdirp('app/dao');
            this.fs.copy(
                this.templatePath('app/dao/user-dao.js'),
                this.destinationPath('app/dao/user-dao.js')
            );
            mkdirp('app/routes');
            this.fs.copy(
                this.templatePath('app/routes/index.js'),
                this.destinationPath('app/routes/index.js')
            );
            this.fs.copy(
                this.templatePath('app/routes/user.js'),
                this.destinationPath('app/routes/user.js')
            );
            mkdirp('app/service');
            mkdirp('app/service/validate');
            this.fs.copy(
                this.templatePath('app/service/validate/validate-user.js'),
                this.destinationPath('app/service/validate/validate-user.js')
            );
            this.fs.copy(
                this.templatePath('app/service/user-server.js'),
                this.destinationPath('app/service/user-server.js')
            );
            this.fs.copy(
                this.templatePath('./lib/spec.js'),
                this.destinationPath('./lib/spec.js')
            );
        }
         
        mkdirp('app/routes/apiguide');
        this.fs.copy(
            this.templatePath('app/routes/apiguide/user.js'),
            this.destinationPath('app/routes/apiguide/user.js')
        );
        mkdirp('config');
        var configTmpl = _.template(this.fs.read(this.templatePath('config/config.js')));
        this.fs.write(this.destinationPath('config/config.js'), configTmpl({
            project_name: this.options.dirname
        }));


        mkdirp('public');
        this.fs.copy(
            this.templatePath('.eslintrc.json'),
            this.destinationPath('.eslintrc.json')
        );
        var apidocTmpl = _.template(this.fs.read(this.templatePath('apidoc.json')));
        this.fs.write(this.destinationPath('apidoc.js'), apidocTmpl({
            project_name: this.options.dirname
        }));
        this.fs.copy(
            this.templatePath('eslintignore'),
            this.destinationPath('eslintignore')
        );
        this.fs.copy(
            this.templatePath('index.js'),
            this.destinationPath('index.js')
        );

        var readmeTmpl = _.template(this.fs.read(this.templatePath('README.md')));
        this.fs.write(this.destinationPath('README.md'), readmeTmpl({
            project_name: this.options.dirname
        }));
        this.fs.copy(
            this.templatePath('server.js'),
            this.destinationPath('server.js')
        );




        var pkg = this.fs.readJSON(this.templatePath('app/package.json'), {});
        extend(pkg, {
            'private': true,
            'scripts': {
                'start': 'node server.js',
                'eslint': 'eslint ./   --ignore-path ./eslintignore -c .eslintrc.json',
                'doc': ' apidoc -i app/routes/ -o apidoc/'
            },
            dependencies: {
                '@koa/cors': '^2.2.1',
                'apidoc': '^0.17.6',
                'debug': '^2.6.3',
                'jslint': '^0.12.0',
                'koa': '^2.5.1',
                'koa-bodyparser': '^3.2.0',
                'koa-convert': '^1.2.0',
                'koa-json': '^2.0.2',
                'koa-logger': '^2.0.1',
                'koa-onerror': '^1.2.1',
                'koa-router': '^7.1.1',
                'koa-static': '^3.0.0',
                'koa-static-plus': '^0.1.1',
                'koa-views': '^5.2.1',
                'log4js': '^2.7.0',
                'pea-logger': '0.0.11'
            },
            devDependencies: {
                'apidoc': '^0.16.1',
                'chai': '^3.5.0',
                'chai3-json-schema': '^1.2.1',
                'co-mocha': '^1.1.2',
                'co-supertest': '0.0.10',
                'mocha': '^2.5.3',
                'supertest': '^1.2.0'
            }
        });


        switch (this.options.database) {
        case 'mongodb':
            mkdirp('model');
            this.fs.copy(
                this.templatePath('model/user.js'),
                this.destinationPath('model/user.js')
            );
            this.fs.copy(
                this.templatePath('lib/mongo.js'),
                this.destinationPath('lib/mongo.js')
            );
            this.fs.copy(
                this.templatePath('model/index.js'),
                this.destinationPath('model/index.js')
            );
            pkg.dependencies.mongoose = '^4.11.7';
            pkg.dependencies['mongoose-paginate'] = '^5.0.3';
            break;
        }
        this.pkg = pkg;
        pkg.name = this.options.dirname;
        // pkg.author = this.options.dirname;
        plugin.generatePlugin(this.options)(this);


    }
    install() {
        this.installDependencies({ bower: false });
    }

};