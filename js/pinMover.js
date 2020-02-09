'use strict';
(function () {

  var limits = {
    top: 130 - window.map.pinAfter.height - window.map.pin.height,
    right: window.map.mapMain.offsetWidth - window.map.mapPinMain.offsetWidth / 2,
    bottom: 630 - window.map.pinAfter.height - window.map.pin.height,
    left: 0 - window.map.mapPinMain.offsetWidth / 2
  };

  window.map.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.map.LEFT_BUTTON_MOUSE_KEY && window.map.activated === false) {
      window.map.activateMap();
    }
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var mapPinTop = window.map.mapPinMain.offsetTop - shift.y;
      var mapPinLeft = window.map.mapPinMain.offsetLeft - shift.x;

      if (mapPinTop >= limits.top && mapPinTop <= limits.bottom) {
        window.map.mapPinMain.style.top = mapPinTop + 'px';
      }

      if (mapPinLeft >= limits.left && mapPinLeft <= limits.right) {
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
