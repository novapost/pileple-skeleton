'use strict';

var p = require('pileple');
var Marionette = p.Marionette;
var _ = p._;

var todoTemplate = require('../../../templates/main/todo.hbs');

module.exports = Marionette.ItemView.extend({
  template: todoTemplate,

  ui: {
    btnDelete: '.todo-btn-delete',
  },

  events: {
    'click @ui.btnDelete': 'clickButtonDelete'
  },

  initialize: function() {
    _.bindAll(this, 'clickButtonDelete');
  },

  clickButtonDelete: function() {
    this.ui.btnDelete.prop('disabled', true);
    this.model.destroy({
      wait: true
    });
  }
});
