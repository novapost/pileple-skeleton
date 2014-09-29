'use strict';

var p = require('pileple');
var Marionette = p.Marionette;

var todoEmptyTemplate = require('../../../templates/main/todo-empty.hbs');

module.exports = Marionette.ItemView.extend({
  template: todoEmptyTemplate
});
