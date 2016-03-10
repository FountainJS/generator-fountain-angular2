const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting: {
    fountain() {
      this.options.framework = 'angular2';
      this.fountainPrompting();
    },

    sample() {
      const done = this.async();

      this.option('sample', {type: Boolean, required: false});

      const prompts = [{
        when: !this.options.sample,
        type: 'list',
        name: 'sample',
        message: 'Do you want a sample app?',
        choices: [
          {name: 'A working landing page', value: 'techs'},
          {name: 'Just a Hello World', value: 'hello'}
        ]
      }];

      this.prompt(prompts, props => {
        Object.assign(this.props, this.options, props);
        done();
      });
    }
  },

  configuring: {
    pkg() {
      this.mergeJson('package.json', {
        dependencies: {
          'angular2': '^2.0.0-beta.0',
          'es6-promise': '^3.0.2',
          'reflect-metadata': '^0.1.2',
          'rxjs': '^5.0.0-beta.0',
          'zone.js': '^0.5.10'
        }
      });
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
    this.composeWith(`fountain-angular2:${this.props.sample}`, {options: this.props}, {
      local: require.resolve(`../${this.props.sample}`)
    });
    this.composeWith('fountain-gulp', {options: this.props}, {
      local: require.resolve('generator-fountain-gulp/generators/app')
    });
  },

  writing() {
    this.copyTemplate('src/index.html', 'src/index.html');
  }
});
