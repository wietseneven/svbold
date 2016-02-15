var singleEvent = require('./singleEvent.js');
var helper = require('./helper');
var particles = require('./particles');
var paths = require('./paths');

var events = {
  init: function () {
    this.setProperties();
    var curEvents = document.querySelector('#' + this.name);
    if (curEvents) curEvents.remove();
    this.setElemCoords();
    this.createContainer();
    this.setupElements();
    this.running = true;
  },
  setProperties: function () {
    this.name = 'Events';
    this.htmlElem = document.getElementsByClassName('event');
    this.elems = [];
  },
  createContainer: function () {
    this.paper = Raphael(this.name, 0, this.width, this.height);
    this.paper.canvas.id = this.name;
  },
  setupElements: function () {
    for (var i = 0; i < this.htmlElem.length; i++) {
      var thisElem = this.htmlElem[i];
      this.elems.push(new particles.particle(thisElem, i));

      this.elems[i].drawEventPath(events);

      this.elems[i].setTextPosition();

      this.elems[i].watchEvent(events);
    }
  },
  setElemCoords: function () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.center = [helper.rand(30, 60), helper.rand(30, 60)];
  },
  toBoldPath: function (elem, callback) {
    var max = 559.760684220507;
    var scale = ((events.height / max) / 2);
    var logoHeight = events.height / 2;

    var posx = events.width / 2 - logoHeight / 2 - (120 * scale);  // find new pos depending on where it is initially
    var posy = events.height / 2 - logoHeight / 2 - 40;

    elem.path.animate({
      "path": paths.boldPath,
      "transform": "t" + posx + "," + posy + ", s" + scale + "," + scale + ",0,0"
    }, 1000, 'backIn', function () {
      setTimeout(function () {
        if (callback) callback(elem);
      }, 300);
    });
  },
  hideEvents: function (except, callback) {
    events.elems[except].path.toFront();
    events.elems[except].path.animate({"path": paths.fullScreenPath(events)}, 400, 'backIn', function () {
      for (var i = 0; i < events.elems.length; i++) {
        var thisElem = events.elems[i];

        if (thisElem.num != except) thisElem.path.remove();
        thisElem.content.classList.add('hidden');
      }

      events.toBoldPath(events.elems[except], callback);

    });
  }
};

module.exports = events;
