var ng = require('@angular/core');
var ngCommon = require('@angular/common');
var ngHttp = require('@angular/http');

var TechsComponent = require('./techs');
var TechComponent = require('./tech');

module.exports = ng.NgModule({
  imports: [
    ngCommon.CommonModule,
    ngHttp.HttpModule
  ],
  declarations: [
    TechsComponent,
    TechComponent
  ],
  exports: [
    TechsComponent
  ]
})
.Class({
  constructor: function () {}
});
