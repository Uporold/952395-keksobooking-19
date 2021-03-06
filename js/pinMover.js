'use strict';

(function () {
  var TOP_LIMIT = 130;
  var BOTTOM_LIMIT = 630;
  var LEFT_LIMIT = 0;

  var limits = {
    top: TOP_LIMIT - window.map.pinAfter.height - window.map.pin.height,
    right: window.map.mapMain.offsetWidth - window.map.mapPinMain.offsetWidth / 2,
    bottom: BOTTOM_LIMIT - window.map.pinAfter.height - window.map.pin.height,
    left: LEFT_LIMIT - window.map.mapPinMain.offsetWidth / 2
  };

  var Rect = function (left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  };


  var Coordinate = function (x, y, constraints) {
    this._constraints = constraints;
    this.setX(x);
    this.setY(y);
  };

  Coordinate.prototype.setX = function (x) {
    if (x >= this._constraints.left &&
      x <= this._constraints.right) {
      this.x = x;
    }
  };

  Coordinate.prototype.setY = function (y) {
    if (y >= this._constraints.top &&
      y <= this._constraints.bottom) {
      this.y = y;
    }
  };

  window.map.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.map.LEFT_BUTTON_MOUSE_KEY && window.map.activated === false) {
      window.map.activateMap();
    }
    var area = new Rect(limits.left, limits.top, limits.right, limits.bottom);
    var startCoords = {x: evt.clientX, y: evt.clientY};
    var onMouseMove = function (moveEvt) {

      var shift = {x: startCoords.x - moveEvt.clientX, y: startCoords.y - moveEvt.clientY};

      startCoords = {x: moveEvt.clientX, y: moveEvt.clientY};

      var mapCoords = new Coordinate(window.map.mapPinMain.offsetLeft - shift.x, window.map.mapPinMain.offsetTop - shift.y, area);
      window.map.mapPinMain.style.left = mapCoords.x + 'px';
      window.map.mapPinMain.style.top = mapCoords.y + 'px';


      window.map.getPinMainCoordinates();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();
