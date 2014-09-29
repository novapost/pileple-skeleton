'use strict';

var p = require('pileple');
var Marionette = p.Marionette;

var TodoView = require('./todo-view');
var TodoEmptyView = require('./todo-empty-view');

var todosListTemplate = require('../../../templates/main/todos-list.hbs');

module.exports = Marionette.CompositeView.extend({
  template: todosListTemplate,

  childViewContainer: '#todos',
  childView: TodoView,
  emptyView: TodoEmptyView
});
