var helper = {
  rand: function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  setPageColor: function (color) {
    var elem = document.getElementsByClassName('brandColor');
    for (var i = 0; i < elem.length; i++) {
      elem[i].style.color = color;
    }

  }
};
module.exports = helper;
