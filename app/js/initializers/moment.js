'use strict';

var moment = require('moment/min/moment-with-locales');

module.exports = function(options) {
  moment.locale(options.lang);
};
