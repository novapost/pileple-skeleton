'use strict';

var p = require('pileple');
var Marionette = p.Marionette;
var _ = p._;
require('./handlebars-helpers');

var MainLayout = require('./views/main-view');

var myApp = new Marionette.Application();

var initializers = require('./initializers');
_.each(initializers, function(value) {
  myApp.addInitializer(value);
});

myApp.on('start', function(options) {
  var mainLayout = new MainLayout(options);
  // Modify app regions in initializers/regions.js
  this.pilepleSkeleton.show(mainLayout);
});

module.exports = myApp;
