'use strict';

var p = require('pileple');
var Backbone = p.Backbone;

var Todo = require('../models/todo');

module.exports = Backbone.Collection.extend({
  model: Todo
});
