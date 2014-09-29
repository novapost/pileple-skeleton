'use strict';

var p = require('pileple');
var i18n = p.i18n;

module.exports = function(options) {
  i18n.init({
    lng: options.lang,
    fallbackLng: 'en',
    getAsync: false,
    resGetPath: options.libPath + '/locales/__lng__/__ns__.json'
  });
};
