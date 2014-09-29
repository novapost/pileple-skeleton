'use strict';

var p = require('pileple');
var i18n = p.i18n;
var Handlebars = require('hbsfy/runtime');

Handlebars.registerHelper('test', function(v1, operator, v2, options) {
  switch (operator) {
    case '==':
      /* jshint -W116 */
      return (v1==v2)?options.fn(this):options.inverse(this);
    case '!=':
      /* jshint -W116 */
      return (v1!=v2)?options.fn(this):options.inverse(this);
    case '===':
      return (v1===v2)?options.fn(this):options.inverse(this);
    case '!==':
      return (v1!==v2)?options.fn(this):options.inverse(this);
    case '&&':
      return (v1&&v2)?options.fn(this):options.inverse(this);
    case '||':
      return (v1||v2)?options.fn(this):options.inverse(this);
    case '<':
      return (v1<v2)?options.fn(this):options.inverse(this);
    case '<=':
      return (v1<=v2)?options.fn(this):options.inverse(this);
    case '>':
      return (v1>v2)?options.fn(this):options.inverse(this);
    case '>=':
      return (v1>=v2)?options.fn(this):options.inverse(this);
    default:
      /* jshint -W061 */
      return eval(''+v1+operator+v2)?options.fn(this):options.inverse(this);
  }
});

Handlebars.registerHelper('t', function(i18nKey) {
  var result = i18n.t(i18nKey);

  return new Handlebars.SafeString(result);
});

Handlebars.registerHelper('tt', function(i18nKey, key) {
  var result = i18n.t(i18nKey+'.'+key);

  return new Handlebars.SafeString(result);
});

Handlebars.registerHelper('tr', function(context, options) {
   var opts = i18n.functions.extend(options.hash, context);
   if (options.fn) {
     opts.defaultValue = options.fn(context);
   }

   var result = i18n.t(opts.key, opts);

   return new Handlebars.SafeString(result);
});
