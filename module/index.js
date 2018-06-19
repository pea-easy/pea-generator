'use strict';

let fs = require('fs');

// console.log(encodeURIComponent('http://45.32.15.120:9000/pay'))




var Generator = require('yeoman-generator');
var _ = require('lodash');
module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
        this.option('babel');
        this.options = {};
    }
    init() {
        this.options.name = process.argv[3];
        var routeTmpl = _.template(this.fs.read(this.templatePath('app/routes/route-template.js')));
        this.fs.write(this.destinationPath('app/routes/' + this.options.name + '.js'), routeTmpl({
            name: this.options.name
        }));


        let str = `
    const `+this.options.name+' = require(\'./'+this.options.name+`');
    app.use(`+this.options.name+'.routes(), '+this.options.name+`.allowedMethods());
};
      `;
        // // fs.appendFileSync('./call.js', str, 'utf-8');
        {
            let data = fs.readFileSync('app/routes/index.js', 'utf-8');
            data = data.trim();
            if (data[data.length - 1] === ';') {
                data = data.slice(0, data.length - 2);
            } else {
                data = data.slice(0, data.length - 1);
            }
            data = data + str;
            fs.writeFileSync('app/routes/index.js', data, 'utf-8');
        }


        var controllersTmpl = _.template(this.fs.read(this.templatePath('app/controllers/controller-template.js')));
        this.fs.write(this.destinationPath('app/controllers/' + this.options.name + '-ctrl.js'), controllersTmpl({
            name: this.options.name
        }));

        var serviceTmpl = _.template(this.fs.read(this.templatePath('app/service/service-template.js')));
        this.fs.write(this.destinationPath('app/service/' + this.options.name + '-service.js'), serviceTmpl({
            name: this.options.name
        }));

        var validateTmpl = _.template(this.fs.read(this.templatePath('app/service/validate/validate-template.js')));
        this.fs.write(this.destinationPath('app/service/validate/validate-' + this.options.name + '.js'), validateTmpl({
            name: this.options.name
        }));

        var apidocTmpl = _.template(this.fs.read(this.templatePath('app/routes/apiguide/api-template.js')));
        this.fs.write(this.destinationPath('app/routes/apiguide/' + this.options.name + '.js'), apidocTmpl({
            name: this.options.name
        }));
    }
    // if the controller name is suffixed with ctrl, remove the suffix
    // if the controller name is just "ctrl," don't append/remove "ctrl"
    // if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
    //     this.name = this.name.slice(0, -4);
    // }
};



