const fountain = require('fountain-generator');

module.exports = fountain.Base.extend({
  writing() {
    [
      'src/main/webapp/index.js',
      'src/main/webapp/index.css',
      'src/main/webapp/app/home.js',
      'src/main/webapp/app/main.js',
      'src/main/webapp/app/navbar.js'
    ].map(file => this.copyTemplate(file, file));
    [
      'src/main/webapp/images/hipster.png',
      'src/main/webapp/images/hipster2x.png',
      'src/main/webapp/images/logo-jhipster.png'
    ].map(image => this.copyAssets(image, image));
  }
});
