var paths = require('./paths');
var singleEvent = require('./singleEvent');

var particles = {
  particle: function (thisElem, thisNum) {
    this.num = thisNum;
    this.content = thisElem.getElementsByClassName("event--inner_content")[0];
    this.color = thisElem.dataset.color;
    this.image = thisElem.dataset.image;
    this.title = thisElem.dataset.title;
    this.type  = thisElem.dataset.type;
  }
};

particles.particle.prototype.drawEventPath = function (events) {
  var path = paths.basePositions(this.type, events.center, events);
  this.path = events.paper.path(path.path);
  this.path.attr({fill: 'url(' + this.image + ')', stroke: "none", "cursor": "pointer"});
};

particles.particle.prototype.setTextPosition = function () {
  this.content.classList.remove('hidden');
  var contentWidth  = this.content.offsetWidth;
  var contentHeight = this.content.offsetHeight;

  var elemWidth = this.path.getBBox().width;
  var elemHeight = this.path.getBBox().height;
  var elemX = this.path.getBBox().x;
  var elemY = this.path.getBBox().y;

  var contentX = (elemWidth / 2 + elemX) - contentWidth / 2;
  var contentY = (elemHeight / 2 + elemY) - contentHeight / 2;

  this.content.style.left = contentX+'px';
  this.content.style.top = contentY+'px';
};

//particles.particle.prototype.animatePathLocation = function () {
//  events.setElemCoords();
//
//  for (var i = 0; i < particles.particles.length; i++) {
//    var thisElem = particles.particles[i];
//    var points = paths.basePositions(this.num);
//    var path = thisElem.transformPathCoords(points);
//    thisElem.path.animate({'path': path}, 300, 'backOut');
//  }
//};

particles.particle.prototype.watchEvent = function (events) {
  var elem = this;
  this.path.hover(
    function () {
      elem.content.classList.add("hover");
    },
    function () {
      elem.content.classList.remove("hover");
    }
  );

  this.path.click(
    function () {
      events.hideEvents(elem.num, function () {
        singleEvent.init(events, elem);
      });
      elem.unwatchEvent();
    }
  );
};
particles.particle.prototype.unwatchEvent = function () {
  this.path.unhover();
  this.path.unclick();
  this.path.attr({"cursor": "inherit"});
};


module.exports = particles;
