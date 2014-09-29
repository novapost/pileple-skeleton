'use strict';

var p = require('pileple');
var Marionette = p.Marionette;
var _ = p._;

var Todo = require('../../models/todo');

var todosAddTemplate = require('../../../templates/main/todos-add.hbs');

module.exports = Marionette.ItemView.extend({
  template: todosAddTemplate,

  ui: {
    inputTodo: '#todos-add-text',
    btnAdd: '#todos-add-submit'
  },

  events: {
    'click @ui.btnAdd': 'clickButtonAdd'
  },

  initialize: function(options) {
    _.bindAll(this, 'clickButtonAdd');
    this.collectionTodos = options.collectionTodos;
  },

  clickButtonAdd: function() {
    var title = this.ui.inputTodo.val();
    if (title !== '') {
      this.ui.inputTodo.val('');

      var todo = new Todo({
        title: title
      });

      this.collectionTodos.add(todo);
    }
  }
});
