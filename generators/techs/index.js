const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  prompting() {
    this.fountainPrompting();
  },

  writing: {
    src() {
      [
        'src/index.js',
        'src/index.css',
        'src/app/footer.js',
        'src/app/footer.spec.js',
        'src/app/header.js',
        'src/app/header.spec.js',
        'src/app/main.js',
        'src/app/main.spec.js',
        'src/app/title.js',
        'src/app/title.spec.js',
        'src/app/techs/tech.js',
        'src/app/techs/tech.spec.js',
        'src/app/techs/techs.js',
        'src/app/techs/techs.spec.js'
      ].map(file => this.copyTemplate(file, file));
    },

    techs() {
      this.prepareTechJson();
    }
  }
});
