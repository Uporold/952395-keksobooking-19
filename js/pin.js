'use strict';
(function () {
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.renderPin = function (ad, id) {
    var pinElement = mapPinTemplate.cloneNode(true);
    window.pinElement = pinElement;

    pinElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    pinElement.dataset.id = id;
    pinElement.querySelector('img').dataset.id = id;
    pinElement.addEventListener('click', window.map.onPinShowCard);
    pinElement.addEventListener('keydown', window.map.onEnterOpenCard);

    return pinElement;
  };
})();
