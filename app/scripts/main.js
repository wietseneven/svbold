/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

var $ = require('jquery');
require('raphael');
var singleEvent = require('./singleEvent');
var events = require('./events.js');


events.init();

document.querySelector('.goHome').addEventListener('click', function () {
  events.init();
});
