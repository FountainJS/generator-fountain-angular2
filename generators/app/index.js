const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting() {
    this.options.framework = 'angular2';
    this.fountainPrompting();
  },

  configuring() {
    this.mergeJson('package.json', {
      dependencies: {
        angular2: '^2.0.0-beta.0',
        'es6-promise': '^3.0.2',
        'reflect-metadata': '^0.1.2',
        rxjs: '^5.0.0-beta.0',
        'zone.js': '^0.5.10'
      }
    });
  },

  composing() {
    this.composeWith('fountain-gulp', { options: this.props }, {
      local: require.resolve('generator-fountain-gulp/generators/app')
    });
  },

  writing() {
    const files = [
      'src/index.html',
      'src/index.css',
      'src/app/hello.js',
      'src/app/hello.spec.js'
    ];

    files.map(file => {
      this.copyTemplate(file, file);
    });

    if (this.props.modules === 'systemjs' && this.props.js === 'typescript') {
      this.copyTemplate('src/index.js', 'src/app/index.js');
    } else {
      this.copyTemplate('src/index.js', 'src/index.js');
    }
  }
});
