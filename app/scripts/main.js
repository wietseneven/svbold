/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

var $ = require('jquery');
require('clip-path-polygon');


function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMasks() {
  var centerPoint = [rand(30, 60), rand(30, 60)];
  var mainPoints = [[0, 0], [20, 0], centerPoint, [30, 100], [0, 100]];
  $('#mainEvent').clipPath(mainPoints, {
    isPercentage: true,
    svgDefId: 'mainEventMask',
    isForWebkit: "undefined",
    isForSvg: "undefined"
  });
  var secondPoints = [[20, 0], [100, 0], [100, 35], centerPoint];
  $('#secondEvent').clipPath(secondPoints, {
    isPercentage: true,
    svgDefId: 'secondEventMask',
    isForWebkit: "undefined",
    isForSvg: "undefined"
  });
  var thirdPoints = [centerPoint, [100, 35], [100, 100], [30, 100]];
  $('#thirdEvent').clipPath(thirdPoints, {
    isPercentage: true,
    svgDefId: 'thirdEventMask',
    isForWebkit: "undefined",
    isForSvg: "undefined"
  });
}
createMasks();

var maskInterval = setInterval(function() {
  createMasks();
}, 5000);
