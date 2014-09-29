'use strict';

var p = require('pileple');
var Marionette = p.Marionette;
var _ = p._;

var TodosAddMainView = require('./main/todos-add-view');
var TodosListMainView = require('./main/todos-list-view');

var Todos = require('../collections/todos');

var mainTemplate = require('../../templates/main.hbs');

module.exports = Marionette.LayoutView.extend({
  template: mainTemplate,

  regions: {
    todosAdd: '#todos-add',
    todosList: '#todos-list'
  },

  initialize: function() {
    _.bindAll(this, 'onRender');
  },

  onRender: function() {
    var todos = new Todos();

    var todosAddMainView = new TodosAddMainView({
      collectionTodos: todos
    });

    var todosListMainView = new TodosListMainView({
      collection: todos
    });

    this.todosAdd.show(todosAddMainView);
    this.todosList.show(todosListMainView);
  }
});
