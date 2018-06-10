'use strict';
var Generator = require('yeoman-generator');
var _ = require('lodash');
module.exports = class extends Generator {
    constructor(args, opts){
        super(args, opts);
        this.option('babel');
        this.options = {};
    }
    init(){
        this.templatePath('app/routes/apiguide/user.js'),
        this.options.name = process.argv[3];
        var routeTmpl = _.template(this.fs.read(this.templatePath('app/routes/route-template.js')));
        this.fs.write(this.destinationPath('app/routes/'+this.options.name+'.js'), routeTmpl({
            name: this.options.name
        }));
    }
    // if the controller name is suffixed with ctrl, remove the suffix
    // if the controller name is just "ctrl," don't append/remove "ctrl"
    // if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
    //     this.name = this.name.slice(0, -4);
    // }
};



