'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var mapMain = document.querySelector('.map');
  var mapPinMain = mapMain.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var notice = document.querySelector('.notice');
  var adForm = notice.querySelector('.ad-form');
  var data = [];

  window.map = {
    mapMain: mapMain,
    mapPinMain: mapPinMain,
    activated: false,
    LEFT_BUTTON_MOUSE_KEY: 0,
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
    activateMap: function () {
      window.map.activated = true;
      mapMain.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.backend.load(successHandler, errorHandler);
      window.controlAdForm(false);
      window.map.getPinMainCoordinates();
    },
    deactivateMap: function () {
      window.map.activated = false;
      mapMain.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      window.controlAdForm(true);
    },
    deleteAllUserAds: function () {
      var mapPins = document.querySelector('.map__pins');
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var userPinsCount = pins.length;
      for (var i = 0; i < userPinsCount; i++) {
        mapPins.querySelectorAll('.map__pin')[1].remove();
      }
      var card = document.querySelector('.map__card');
      if (card) {
        card.remove();
      }
    }
  };
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var successHandler = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(window.renderPin(ads[i], i));
    }
    document.querySelector('.map__pins').appendChild(fragment);
    data = ads;
  };

  var renderCards = function (id) {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    var cardsFragment = document.createDocumentFragment();
    cardsFragment.appendChild(window.renderCard(data[id]));
    mapMain.insertBefore(cardsFragment, mapFiltersContainer);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; text-align: center; background-color: red; position: sticky; top: 0; font-size: 30px;';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
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
