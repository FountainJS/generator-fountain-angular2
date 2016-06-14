const fountain = require('fountain-generator');
const version = require('../../package.json').version;

module.exports = fountain.Base.extend({
  prompting: {
    fountain() {
      this.options.framework = 'angular2';
      return this.fountainPrompting();
    },

    sample() {
      this.option('sample', {type: Boolean, required: false});

      const prompts = [{
        when: !this.options.sample,
        type: 'list',
        name: 'sample',
        message: 'Do you want a sample app?',
        choices: [
          {name: 'A working landing page', value: 'techs'},
          {name: 'Just a Hello World', value: 'hello'},
          {name: 'Ngrx/store TodoMVC', value: 'todoMVC'}
        ]
      }];

      return this.prompt(prompts).then(props => {
        Object.assign(this.props, props);
      });
    }
  },

  configuring: {
    config() {
      this.config.set('version', version);
      this.config.set('props', this.props);
    },

    pkg() {
      this.mergeJson('package.json', {
        dependencies: {
          '@angular/core': '2.0.0-rc.1',
          '@angular/compiler': '2.0.0-rc.1',
          '@angular/common': '2.0.0-rc.1',
          '@angular/platform-browser': '2.0.0-rc.1',
          '@angular/platform-browser-dynamic': '2.0.0-rc.1',
          '@angular/http': '2.0.0-rc.1',
          'rxjs': '5.0.0-beta.8',
          'zone.js': '^0.6.12',
          'es6-promise': '^3.0.2',
          'reflect-metadata': '0.1.2'
        }
      });
      if (this.props.js === 'typescript') {
        this.mergeJson('package.json', {dependencies: {'es6-shim': '^0.35.0'}});
      }
      if (this.props.sample === 'jhipster') {
        this.mergeJson('package.json', {dependencies: {bootstrap: '^3.3.6'}});
      }
    },

    babel() {
      if (this.props.js === 'babel') {
        this.mergeJson('package.json', {
          devDependencies: {
            'babel-plugin-angular2-annotations': '^5.0.0',
            'babel-plugin-transform-class-properties': '^6.5.2',
            'babel-plugin-transform-decorators-legacy': '^1.3.4',
            'babel-plugin-transform-flow-strip-types': '^6.5.0'
          }
        });

        this.mergeJson('.babelrc', {
          plugins: [
            'angular2-annotations',
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-flow-strip-types'
          ]
        });
      }
    }
  },

  composing() {
    const options = {
      framework: this.props.framework,
      modules: this.props.modules,
      js: this.props.js,
      css: this.props.css,
      sample: this.props.sample
    };

    this.composeWith(`fountain-angular2:${this.props.sample}`, {options}, {
      local: require.resolve(`../${this.props.sample}`)
    });
    this.composeWith('fountain-gulp', {options}, {
      local: require.resolve('generator-fountain-gulp/generators/app')
    });
  },

  writing() {
    const prefix = this.props.sample === 'jhipster' ? 'src/main/webapp' : 'src';
    this.copyTemplate('src/index.html', `${prefix}/index.html`);
  }
});
