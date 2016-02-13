/**
 * scripts/main.js
 *
 * This is the starting point for your application.
 * Take a look at http://browserify.org/ for more info
 */

'use strict';

var $ = require('jquery');
require('raphael');

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var events = {
  el: {
    events: $('.events').children()
  },
  init: function() {
    this.setProperties();
    this.createContainer();
    this.drawElements();
  },
  setProperties: function() {
    this.width  = $(window).width();
    this.height = $(window).height();
    this.name   = 'events';
    this.htmlElem   = document.getElementsByClassName('event');
    this.center = [rand(30, 60), rand(30, 60)];
  },
  createContainer: function() {
    this.paper = Raphael(this.name, 0, this.width, this.height);
  },
  drawElements: function() {
    this.topCenterPoint = [20, 0];
    this.rightCenterPoint = [100, 35];
    this.bottomCenterPoint = [30, 100];
    this.elems = [];

    for (var i = 0; i < this.htmlElem.length; i++) {
      var thisElem = this.htmlElem[i];
      var elem = {};
      elem.id        = thisElem.id;
      elem.color     = thisElem.dataset.color;
      elem.image     = thisElem.dataset.image;
      elem.title     = thisElem.dataset.title;
      elem.location  = thisElem.dataset.location;
      elem.date      = thisElem.dataset.date;
      elem.startPosX = 0;
      elem.startPosY = 0;

      this.drawEventPath(i, elem);
      this.writeEventText(elem);
      elem.path.hover(function() {
        console.log('hovering '+ elem.id);
        //elem.path.animate({path:"M140 100 L190 60"}, 2000);
      });

      this.elems.push(elem);
    }

  },
  elem: function() {

  },
  drawEventPath: function(i, elem) {
    var points,
        path = '';
    if (i == 0) points = [[0, 0], this.topCenterPoint, this.center, this.bottomCenterPoint, [0, 100]];
    if (i == 1) points = [this.topCenterPoint, [100, 0], this.rightCenterPoint, this.center];
    if (i == 2) points = [this.center, this.rightCenterPoint, [100, 100], this.bottomCenterPoint];

    for (var j = 0; j < points.length; j++) {
      var thisPoint = points[j];
      var x = thisPoint[0] / 100 * this.width;
      var y = thisPoint[1] / 100 * this.height;

      if(j == 0) {
        path += 'M';
        elem.startPosX = x;
        elem.startPosY = y;
      } else {
        path += ' L';
      }

      if (elem.startPosX > x) elem.startPosX = x;
      if (elem.startPosY > y) elem.startPosY = y;
      path +=  x + ' ' + y;
    }

    elem.path = this.paper.path(path+"Z");
    elem.path.attr({fill:'url('+elem.image+')', stroke: "none"});
  },
  writeEventText: function(elem) {
    elem.width  = elem.path.getBBox().width;
    elem.height = elem.path.getBBox().height;

    var textPosX = (elem.width / 2) + elem.startPosX;
    var textPosY = (elem.height / 2) + elem.startPosY;

    elem.eventTitle = this.paper.text(textPosX, textPosY, elem.title);
    elem.eventTitle.attr({ "fill": elem.color});
    elem.eventTitle.node.setAttribute("class","event--inner_title");

    elem.eventLocation = this.paper.text(textPosX, textPosY + 35, elem.location);
    elem.eventLocation.attr({ "fill": elem.color});
    elem.eventLocation.node.setAttribute("class","event--inner_location");

    elem.eventLocation = this.paper.text(textPosX, textPosY + 65, elem.date);
    elem.eventLocation.attr({ "fill": elem.color});
    elem.eventLocation.node.setAttribute("class","event--inner_date");
  }
};
events.init();

