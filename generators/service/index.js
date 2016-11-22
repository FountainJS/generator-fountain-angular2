const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  writing() {
    const name = this.options.name || 'service';
    const titleCase = string => string.charAt(0).toUpperCase() + string.slice(1);
    const lowerCase = string => string.charAt(0).toLowerCase() + string.slice(1);
    const path = this.options.dir ? `app/${this.options.dir}` : `app`;
    const props = {
      serviceName: lowerCase(name),
      className: titleCase(name),
      modules: this.config.get('props').modules,
      js: this.config.get('props').js,
      framework: 'angular2',
      name
    };
    this.copyTemplate(`src/app/service.js`, `src/${path}/${name}.js`, props);
    this.copyTemplate(`src/app/service.spec.js`, `src/${path}/${name}.spec.js`, props);
  }
});
