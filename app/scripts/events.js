var singleEvent = require('./singleEvent.js');

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var events = {
  init: function() {
    this.setProperties();
    this.setElemCoords();
    this.createContainer();
    this.setupElements();
  },
  setProperties: function() {
    this.name     = 'events';
    this.htmlElem = document.getElementsByClassName('event');
    this.elems    = [];
  },
  createContainer: function() {
    this.paper = Raphael(this.name, 0, this.width, this.height);
    this.paper.canvas.id = "Events";
  },
  setupElements: function() {
    for (var i = 0; i < this.htmlElem.length; i++) {
      var thisElem = this.htmlElem[i];
      this.elems.push(new this.elem(thisElem, i));
      this.elems[i].drawEventPath();
      this.elems[i].writeEventText();
      this.elems[i].groupElements();
      this.elems[i].watchEvent();
    }
  },
  setElemCoords: function() {
    this.width             = window.innerWidth;
    this.height            = window.innerHeight;
    this.center            = [rand(30, 60), rand(30, 60)];
    this.topCenterPoint    = [20, 0];
    this.rightCenterPoint  = [100, 35];
    this.bottomCenterPoint = [30, 100];
  },
  elem: function(thisElem, thisNum) {
    this.id        = thisElem.id;
    this.num       = thisNum;
    this.color     = thisElem.dataset.color;
    this.image     = thisElem.dataset.image;
    this.title     = thisElem.dataset.title;
    this.location  = thisElem.dataset.location;
    this.date      = thisElem.dataset.date;
    this.startPosX = 0;
    this.startPosY = 0;
  },
  fullScreenPath: function() {
    return 'M0 0 L'+this.width+' 0 L'+this.width+' '+this.height+' L0 '+this.height+' Z';
  },
  boldPath: function() {
    return "M523,113.39a120.78,120.78,0,0,0-213.28,1.21L155,382.53a120.78,120.78,0,0,0,107.69,184.1l309.41,0.07A120.78,120.78,0,0,0,677.69,381.38ZM462.17,508.83l-90.89,0a6.11,6.11,0,0,1-5.44-8.87A120.78,120.78,0,0,0,265,325.41a6.11,6.11,0,0,1-5-9.15l45.48-78.7a6.11,6.11,0,0,1,10.4-.28,120.78,120.78,0,0,0,201.53,0,6.11,6.11,0,0,1,10.41.28l45.41,78.73a6.11,6.11,0,0,1-5,9.15A120.78,120.78,0,0,0,467.61,500,6.11,6.11,0,0,1,462.17,508.83ZM416.71,107.89a62.8,62.8,0,1,1-62.8,62.8A62.8,62.8,0,0,1,416.71,107.89ZM203.4,477.36a62.8,62.8,0,1,1,85.79,23A62.8,62.8,0,0,1,203.4,477.36Zm426.63,0a62.8,62.8,0,1,1-23-85.79A62.8,62.8,0,0,1,630,477.36Z";
  },
  toBoldPath: function(elem, callback) {
    var max = 559.760684220507;
    var scale = ((events.height/max) / 2);
    var logoHeight = events.height / 2;

    var posx = events.width / 2 - logoHeight / 2 - (120 * scale);  // find new pos depending on where it is initially
    var posy = events.height / 2 - logoHeight / 2 - 40;

    elem.path.animate({
      "path": events.boldPath(),
      "transform" : "t" + posx + "," + posy + ", s"+scale+","+scale+",0,0"
    }, 1000, 'backIn', function() {
      if (callback) callback();
    });
  },
  hideEvents: function(except) {
    events.elems[except].elems.toFront();
    events.elems[except].path.animate({"path": this.fullScreenPath() }, 400, 'backIn', function() {
      for (var i = 0; i < events.elems.length; i++) {
        var thisElem = events.elems[i];
        if (thisElem.num != except) {
          thisElem.elems.remove();
        } else {
          thisElem.textElems.remove();
        }
      }

      events.toBoldPath(events.elems[except]);

    });
  }
};

events.elem.prototype.getPathCoords = function() {
  if (this.num == 0) return [[0, 0], events.topCenterPoint, events.center, events.bottomCenterPoint, [0, 100]];
  if (this.num == 1) return [events.topCenterPoint, [100, 0], events.rightCenterPoint, events.center];
  if (this.num == 2) return [events.center, events.rightCenterPoint, [100, 100], events.bottomCenterPoint];
};
events.elem.prototype.transformPathCoords = function(points) {
  var path = '';

  for (var j = 0; j < points.length; j++) {
    var thisPoint = points[j];
    var x = thisPoint[0] / 100 * events.width;
    var y = thisPoint[1] / 100 * events.height;

    if(j == 0) {
      path += 'M';
      this.startPosX = x;
      this.startPosY = y;
    } else {
      path += ' L';
    }

    if (this.startPosX > x) this.startPosX = x;
    if (this.startPosY > y) this.startPosY = y;
    path +=  x + ' ' + y;
  }
  path += " Z";
  return path;
};
events.elem.prototype.drawEventPath = function(i, elem) {
  var points = this.getPathCoords();
  var path   = this.transformPathCoords(points);
  this.path  = events.paper.path(path);
  this.path.attr({fill:'url('+this.image+')', stroke: "none", "cursor": "pointer"});
};

events.elem.prototype.writeEventText = function() {
  this.width  = this.path.getBBox().width;
  this.height = this.path.getBBox().height;

  var textPosX = (this.width / 2) + this.startPosX;
  var textPosY = (this.height / 2) + this.startPosY;

  this.eventTitle = events.paper.text(textPosX, textPosY, this.title);
  this.eventTitle.attr({ "fill": this.color});
  this.eventTitle.node.setAttribute("class","event--inner_title");

  this.eventLocation = events.paper.text(textPosX, textPosY + 35, this.location);
  this.eventLocation.attr({ "fill": this.color});
  this.eventLocation.node.setAttribute("class","event--inner_location");

  this.eventDate = events.paper.text(textPosX, textPosY + 65, this.date);
  this.eventDate.attr({ "fill": this.color});
  this.eventDate.node.setAttribute("class","event--inner_date");
};

events.elem.prototype.groupElements = function() {
  this.elems     = events.paper.set();
  this.textElems = events.paper.set();
  this.textElems.push(
    this.eventTitle,
    this.eventLocation,
    this.eventDate
  );
  this.elems.push(
    this.path,
    this.eventTitle,
    this.eventLocation,
    this.eventDate
  );
};

events.elem.prototype.animatePathLocation = function() {
  events.setElemCoords();

  for (var i = 0; i < events.elems.length; i++){
    var thisElem = events.elems[i];
    var points   = thisElem.getPathCoords();
    var path     = thisElem.transformPathCoords(points);
    thisElem.path.animate({'path':path}, 300, 'backOut');
  }
};

events.elem.prototype.watchEvent = function() {
  var elem = this;
  this.elems.hover(
    function() {
      //elem.elems.toFront().animate({'transform':"s1.2 1.2"}, 400, 'backOut');
      elem.textElems.forEach(addElemClass);
      function addElemClass(element, index) {
        element.node.classList.add("hover");
      }
    },
    function() {
      //elem.elems.animate({'transform':"s1 1"}, 300, 'backIn');
      elem.textElems.forEach(removeElemClass);
      function removeElemClass(element, index) {
        element.node.classList.remove('hover');
      }
    }
  );

  this.elems.click(
    function() {
      events.hideEvents(elem.num, singleEvent.init());
      elem.unwatchEvent();
    }
  );
};
events.elem.prototype.unwatchEvent = function() {
  this.elems.unhover();
  this.elems.unclick();
  this.path.attr({"cursor":"inherit"});
};

module.exports = events;
