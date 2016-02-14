/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

var $ = require('jquery');
require('raphael');
var events = require('./events.js');
var singleEvent = require('./singleEvent.js');
events.init();
