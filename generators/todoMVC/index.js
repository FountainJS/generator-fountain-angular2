const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  configuring() {
    this.mergeJson('package.json', {
      dependencies: {
        '@ngrx/store': '^1.5.0'
      },
      devDependencies: {
        'todomvc-app-css': '^2.0.4'
      }
    });
    if (this.options.js === 'js') {
      this.mergeJson('package.json', {
        dependencies: {'object-assign': '^4.1.0'}
      });
    }
  },

  writing: {
    src() {
      [
        'src/index.html',
        'src/index.js',
        'src/index.css',

        'src/app/actions/index.js',
        'src/app/components/Footer.js',
        'src/app/components/Footer.spec.js',
        'src/app/components/Header.js',
        'src/app/components/Header.spec.js',
        'src/app/components/MainSection.js',
        'src/app/components/MainSection.spec.js',
        'src/app/components/TodoItem.js',
        'src/app/components/TodoItem.spec.js',
        'src/app/components/TodoTextInput.js',
        'src/app/components/TodoTextInput.spec.js',

        'src/app/constants/ActionTypes.js',
        'src/app/constants/TodoFilters.js',

        'src/app/containers/App.js',

        'src/app/reducers/todos.js',
        'src/app/reducers/todos.spec.js'

      ].map(file => this.copyTemplate(file, file));
    }
  }
});
