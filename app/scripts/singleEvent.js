var paths = require('./paths.js');
var helper = require('./helper');
var singleEvent = {
  init: function (event, elem) {
    if (event) {
      this.paper = event.paper;
      helper.setPageColor(elem.color);
    } else {
      this.setupCanvas();
    }
    this.setupBase(elem);
  },
  setupCanvas: function () {
    this.name = 'singleEvent';
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.paper = this.paper = Raphael(this.name, 0, this.width, this.height);
  },
  setupBase: function (elem) {
    if (elem) {
      this.titleBox = elem.path.animate({
        "path": paths.basePositions('leftTitle').path,
        "transform": "s1 1"
      }, 300, 'backIn', function () {
        singleEvent.createContent({
          'drawFrom': 'leftTitle'
        });
      });
    } else {
      this.createTitle();
      this.createContent();
    }
  },
  createTitle: function () {
    this.titleBox = this.canvas.path(paths.basePositions('leftTitle').path);
    this.titleBox.attr({fill: 'url(' + this.image + ')', stroke: "none"});
  },
  createContent: function () {
    var startPath = paths.basePositions('leftTitle').path;
    startPath = startPath.split(' ');
    startPath = 'M' + startPath[2].split('L')[1] + ' ' + startPath[3] + ' ' + startPath[4] + ' ' + startPath[5] + 'Z';

    //this.bigContent = this.canvas.path(startPath);
    //this.bigContent.attr({fill: 'red', stroke: "none"}).toBack();
    //this.bigContent.animate({"path": paths.basePositions('rightContentBig').path}, 400, 'backIn');
  }
};
module.exports = singleEvent;
