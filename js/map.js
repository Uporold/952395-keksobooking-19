'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var mapMain = document.querySelector('.map');
  var mapPinMain = mapMain.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var notice = document.querySelector('.notice');
  var adForm = notice.querySelector('.ad-form');

  window.map = {
    pinAfter: {
      height: 22,
      width: 10
    },
    pin: {
      height: 64,
      width: 64
    },
    getPinMainCoordinates: function () {
      var getIntCoordinates = function (value) {
        return parseInt(value, 10);
      };
      var y = getIntCoordinates(mapPinMain.style.top) + window.map.pin.height + window.map.pinAfter.height;
      var x = getIntCoordinates(mapPinMain.style.left) + window.map.pin.width / 2;
      addressInput.value = x + ', ' + y;
    },

    onPinShowCard: function (evt) {
      var adId = evt.target.dataset.id;
      renderCards(adId);
    },

    onEnterOpenCard: function (evt) {
      if (evt.key === ENTER_KEY) {
        window.map.onPinShowCard(evt);
      }
    },

    onEscCloseCard: function (evt) {
      if (evt.key === ESC_KEY) {
        closeCard();
      }
    },

    onMouseButtonCloseCard: function (evt) {
      if (evt.button === window.map.LEFT_BUTTON_MOUSE_KEY) {
        closeCard();
      }
    },

    onEnterCloseCard: function (evt) {
      if (evt.key === ENTER_KEY) {
        closeCard();
      }
    },
    mapMain: mapMain,
    mapPinMain: mapPinMain,
    activated: false,
    LEFT_BUTTON_MOUSE_KEY: 0,
    activateMap: function () {
      window.map.activated = true;
      mapMain.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      renderPins();
      window.controlAdForm(false);
      window.map.getPinMainCoordinates();
    }
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.ads.length; i++) {
      fragment.appendChild(window.renderPin(window.ads[i], i));
    }
    document.querySelector('.map__pins').appendChild(fragment);
  };

  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var renderCards = function (id) {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild(window.renderCard(window.ads[id]));
    mapMain.insertBefore(fragment, mapFiltersContainer);
  };

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY && window.map.activated === false) {
      window.map.activateMap();
    }
  });

  var closeCard = function () {
    document.querySelector('.map__card').remove();
  };
})();
