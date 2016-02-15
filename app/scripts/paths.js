var helper = require('./helper');
var paths = {
  topCenterPoint: [20, 0],
  rightCenterPoint: [100, 35],
  bottomCenterPoint: [30, 100],
  center: [helper.rand(30, 60), helper.rand(30, 60)],
  lowCenter: [helper.rand(30, 40), helper.rand(60, 80)],
  boldPath: function () {
    return "M523,113.39a120.78,120.78,0,0,0-213.28,1.21L155,382.53a120.78,120.78,0,0,0,107.69,184.1l309.41,0.07A120.78,120.78,0,0,0,677.69,381.38ZM462.17,508.83l-90.89,0a6.11,6.11,0,0,1-5.44-8.87A120.78,120.78,0,0,0,265,325.41a6.11,6.11,0,0,1-5-9.15l45.48-78.7a6.11,6.11,0,0,1,10.4-.28,120.78,120.78,0,0,0,201.53,0,6.11,6.11,0,0,1,10.41.28l45.41,78.73a6.11,6.11,0,0,1-5,9.15A120.78,120.78,0,0,0,467.61,500,6.11,6.11,0,0,1,462.17,508.83ZM416.71,107.89a62.8,62.8,0,1,1-62.8,62.8A62.8,62.8,0,0,1,416.71,107.89ZM203.4,477.36a62.8,62.8,0,1,1,85.79,23A62.8,62.8,0,0,1,203.4,477.36Zm426.63,0a62.8,62.8,0,1,1-23-85.79A62.8,62.8,0,0,1,630,477.36Z";
  },
  fullScreenPath: function (parent) {
    var w, h;
    if (parent) {
      w = parent.width;
      h = parent.height;
    } else {
      w = window.innerWidth;
      h = window.innerHeight;
    }
    return 'M0 0 L' + w + ' 0 L' + w + ' ' + h + ' L0 ' + h + ' Z';
  },
  basePositions: function (num, center, parent) {
    var cpoint;
    if (center == undefined) {
      cpoint = this.center;
    } else {
      cpoint = center;
    }
    var points;
    if (num == 0 || num == 'thirdLeft')
      points = [[0, 0], this.topCenterPoint, cpoint, this.bottomCenterPoint, [0, 100]];
    if (num == 1 || num == 'thirdTop')
      points = [this.topCenterPoint, [100, 0], this.rightCenterPoint, cpoint];
    if (num == 2 || num == 'thirdBottom')
      points = [cpoint, this.rightCenterPoint, [100, 100], this.bottomCenterPoint];
    if (num == 'leftTitle')
      points = [[0, 0], this.topCenterPoint, this.lowCenter, [0, 100]];
    if (num == 'rightContentBig')
      points = [this.topCenterPoint, [100, 0], [100, 100], [70, 100], this.lowCenter];
    if (num == 'bottomCTA')
      points = [[0, 100], this.lowCenter, [70, 100]]
    return this.transformPathCoords(points, parent);
  },
  transformPathCoords: function (points, parent) {
    var w, h;
    if (parent) {
      w = parent.width;
      h = parent.height;
    } else {
      w = window.innerWidth;
      h = window.innerHeight;
    }

    var path = '';
    var startPosX;
    var startPosY;
    for (var j = 0; j < points.length; j++) {
      var thisPoint = points[j];
      var x = thisPoint[0] / 100 * w;
      var y = thisPoint[1] / 100 * h;

      if (j == 0) {
        path += 'M';
        startPosX = x;
        startPosY = y;
      } else {
        path += ' L';
      }

      if (startPosX > x) startPosX = x;
      if (startPosY > y) startPosY = y;
      path += x + ' ' + y;
    }
    path += " Z";
    return {path: path, startPosX: startPosX, startPosY: startPosY};
  }
};
module.exports = paths;
