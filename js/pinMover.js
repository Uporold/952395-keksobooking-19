'use strict';
(function () {
  var limits = {
    top: 100,
    right: window.map.mapMain.offsetWidth - window.map.mapPinMain.offsetWidth / 2,
    bottom: window.map.mapMain.offsetHeight - window.map.mapPinMain.offsetHeight - window.map.pinAfter.height - document.querySelector('.map__filters-container').offsetHeight,
    left: 0 - window.map.mapPinMain.offsetWidth / 2
  };

  window.map.mapPinMain.addEventListener('mousedown', function (evt) {
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
