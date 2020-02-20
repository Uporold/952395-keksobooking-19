'use strict';
(function () {

  var limits = {
    top: 130 - window.map.pinAfter.height - window.map.pin.height,
    right: window.map.mapMain.offsetWidth - window.map.mapPinMain.offsetWidth / 2,
    bottom: 630 - window.map.pinAfter.height - window.map.pin.height,
    left: 0 - window.map.mapPinMain.offsetWidth / 2
  };

  var Rect = function (left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  };


  var Coordinate = function (x, y, constraints) {
    this.x = x;
    this.y = y;
    this._constraints = constraints;
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
    var startCoords = new Coordinate(evt.clientX, evt.clientY);
    var onMouseMove = function (moveEvt) {

      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY /* , area*/);
      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);

      var mapPinTop = window.map.mapPinMain.offsetTop - shift.y;
      var mapPinLeft = window.map.mapPinMain.offsetLeft - shift.x;

      if (mapPinTop >= area.top && mapPinTop <= area.bottom) {
        window.map.mapPinMain.style.top = mapPinTop + 'px';
      }

      if (mapPinLeft >= area.left && mapPinLeft <= area.right) {
        window.map.mapPinMain.style.left = mapPinLeft + 'px';
      }


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
