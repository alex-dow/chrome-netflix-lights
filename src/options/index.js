var jsc = require('../common/jscolor.js');
var formCb = require('./form.js');
var tabsCb = require('./tabs.js');

formCb.onLoad();
tabsCb.onLoad();

window.jscolor = jsc.jscolor;
jsc.register();
jsc.init();

console.log('options js loaded');

