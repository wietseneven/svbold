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


//var maskInterval = setInterval(function() {
//  createMasks();
//}, 5000);
var events = {
  el: {
    events: $('.events').children()
  },
  init: function() {
  //  this.createMasks();
    this.watchEvents();
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
    var topCenterPoint = [20, 0];
    var rightCenterPoint = [100, 35];
    var bottomCenterPoint = [30, 100];

    for (var i = 0; i < this.htmlElem.length; i++) {
      var thisElem = this.htmlElem[i];
      var elem = {};
      elem.id         = thisElem.id;
      elem.color      = thisElem.dataset.color;
      elem.image      = thisElem.dataset.image;
      elem.proportion = thisElem.dataset.proportion;

      var points;
      var path = '';
      if (i == 0) points = [[0, 0], topCenterPoint, this.center, bottomCenterPoint, [0, 100]];
      if (i == 1) points = [topCenterPoint, [100, 0], rightCenterPoint, this.center];
      if (i == 2) points = [this.center, rightCenterPoint, [100, 100], bottomCenterPoint];

      for (var j = 0; j < points.length; j++) {
        var thisPoint = points[j];
        var x = thisPoint[0] / 100 * this.width;
        var y = thisPoint[1] / 100 * this.height;

        j == 0 ? path += 'M' : path += ' L';

        if (elem.startPosX > x) elem.startPosX = x;
        if (elem.startPosY > x) elem.startPosY = y;
        path +=  x + ' ' + y;
      }

      elem.path = this.paper.path(path+"Z");
      elem.path.attr({fill:'url('+elem.image+')', stroke: "none"});

    }
  },

  createMasks: function() {
    var centerPoint = [rand(30, 60), rand(30, 60)];
    var topCenterPoint = [20, 0];
    var rightCenterPoint = [100, 35];
    var bottomCenterPoint = [30, 100];
    var i = 0;
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();

    var svg = '<svg height="'+windowHeight+'" width="'+windowWidth+'" viewBox="0 0 '+windowWidth+' '+windowHeight+'" preserveAspectRatio="none">';

    this.el.events.each(function() {
      var $this = $(this);
      var points;
      var eventImage = $this.attr('data-image');
      var imageProportion = $this.attr('data-proportion');
      var eventColor = $this.attr('data-color');
      var eventID = $(this).attr('id');
      if (i == 0){
        points = [[0, 0], topCenterPoint, centerPoint, bottomCenterPoint, [0, 100]];
      } else if (i == 1) {
        points = [topCenterPoint, [100, 0], rightCenterPoint, centerPoint];
      } else {
        points = [centerPoint, rightCenterPoint, [100, 100], bottomCenterPoint];
      }

      var path = '';
      var curPoint = 0;
      var startPosX = 0;
      var startPosY = 0;
      points.forEach(function() {
        var thisPoint = points[curPoint];
        var x = thisPoint[0] / 100 * windowWidth;
        var y = thisPoint[1] / 100 * windowHeight;
        if (curPoint == 0) {
          path += 'M';
          startPosX = x;
          startPosY = y;
        } else {
          path += ' L'
        }

        startPosX > x ? startPosX = x : startPosX;
        startPosY > x ? startPosY = y : startPosY;

        path +=  x + ' ' + y;

        curPoint++;
      });

      var calcPoint;
      if (i == 0) {
        calcPoint = centerPoint[0];
      } else if (i == 1) {
        calcPoint = 100 - topCenterPoint[0];
      } else {
        calcPoint = 100 - bottomCenterPoint[0];
      }

      var imageWidth = calcPoint / 100 * windowWidth;
      var imageHeight = imageWidth * imageProportion;

      svg +='<path d="'+path+' Z" fill="url(#'+eventID+'-img)" id="'+eventID+'"></path>';
      svg +='<defs>';
      svg +='<pattern id="'+eventID+'-img" patternUnits="userSpaceOnUse" width="'+imageWidth+'" height="'+imageHeight+'" x="'+startPosX+'" y="-'+startPosY+'">';
      svg +='<image xlink:href="'+eventImage+'" x="0" y="0" width="'+imageWidth+'" height="'+imageHeight+'" />';
      svg +='</pattern></defs>';

      svg += '<g font-size="30" font-family="sans-serif" fill="black" stroke="none" text-anchor="middle"><text x="100" y="350" dx="-30">A</text></g>';
      i++;

      $this.remove();
    });

    $('#examples').append($(svg));

  },
  watchEvents: function() {
    this.el.events.hover(
      function() {
        $(this).addClass('hover');
      },
      function() {
        $(this).removeClass('hover');
      }
    );
    this.el.events.click(function(e) {
      e.preventDefault();
      events.openEvent($(this));
    });
  },
  openEvent: function(elem) {
    this.hideEvents();
  },
  hideEvents: function() {
    var i = 0;
    this.el.events.each(function() {
      var $this = $(this);
      setTimeout(function() {
        $this.fadeOut();
      }, i * 100);
      i++;
    });
  }
};
events.init();

