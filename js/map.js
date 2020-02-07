'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var LEFT_BUTTON_MOUSE_KEY = 0;

  var mapMain = document.querySelector('.map');
  var mapPinMain = mapMain.querySelector('.map__pin--main');

  window.map = {
    pinAfter: {
      height: 22,
      width: 10
    },
    getPinMainCoordinates: function () {
      var getIntCoordinates = function (value) {
        return parseInt(value, 10);
      };
      var y = getIntCoordinates(mapPinMain.style.top) + pin.height + window.map.pinAfter.height;
      var x = getIntCoordinates(mapPinMain.style.left) + pin.width / 2;
      addressInput.value = x + ', ' + y;
    },

    onPinShowCard: function (evt) {
      var adId = evt.target.dataset.id;
      renderCards(adId);
    },

    onEnterOpenCard: function (evt) {
      if (evt.key === ENTER_KEY) {
        this.onPinShowCard(evt);
      }
    },

    onEscCloseCard: function (evt) {
      if (evt.key === ESC_KEY) {
        closeCard();
      }
    },

    onMouseButtonCloseCard: function (evt) {
      if (evt.button === LEFT_BUTTON_MOUSE_KEY) {
        closeCard();
      }
    },

    onEnterCloseCard: function (evt) {
      if (evt.key === ENTER_KEY) {
        closeCard();
      }
    },
    mapMain: mapMain,
    mapPinMain: mapPinMain
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

  var pin = {
    height: 64,
    width: 64
  };

  var notice = document.querySelector('.notice');
  var adForm = notice.querySelector('.ad-form');
  var addressInput = document.querySelector('#address');

  var activateMap = function () {
    mapMain.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.controlAdForm(false);
    window.map.getPinMainCoordinates();
    renderPins();
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === LEFT_BUTTON_MOUSE_KEY) {
      activateMap();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      activateMap();
    }
  });

  var closeCard = function () {
    document.querySelector('.map__card').remove();
  };


})();
