'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var mapMain = document.querySelector('.map');
  var mapPinMain = mapMain.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var notice = document.querySelector('.notice');
  var adForm = notice.querySelector('.ad-form');
  var adFormElementList = notice.querySelectorAll('.ad-form__element');

  var mapFilters = document.querySelector('.map__filters');
  var mapFilterList = mapFilters.querySelectorAll('*');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var typeSelect = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomsSelect = document.querySelector('#housing-rooms');
  var guestSelect = document.querySelector('#housing-guests');

  var filteredData = [];
  var data = [];

  var deleteActivePin = function () {
    var pinActive = document.querySelector('.map__pin--active');
    if (pinActive) {
      pinActive.classList.remove('map__pin--active');
    }
  };

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
      var currentPin = evt.currentTarget;
      var adId = evt.target.dataset.id;
      renderCards(adId);
      deleteActivePin();
      currentPin.classList.add('map__pin--active');
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
      window.backend.load(onSuccessLoadHandler, onErrorLoadHandler);
      window.switchForm(adFormElementList, false);
      document.querySelector('#avatar').disabled = false;
      document.querySelector('#images').disabled = false;
      window.map.getPinMainCoordinates();
    },
    deactivateMap: function () {
      window.map.activated = false;
      mapMain.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      window.switchForm(adFormElementList, true);
      window.switchForm(mapFilterList, true);
      document.querySelector('#avatar').disabled = true;
      document.querySelector('#images').disabled = true;
      mapPinMain.style = 'left: 570px; top: 375px';
    },
    deleteAllUserAds: function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      var card = document.querySelectorAll('.map__card');

      pins.forEach(function (pin) {
        pin.remove();
      });
      card.forEach(function (popup) {
        popup.remove();
      });
    },
    clearFilters: function () {
      mapFilters.reset();
      drawFilteredPins(data);
    }
  };

  var onSuccessLoadHandler = function (ads) {
    data = ads;
    drawFilteredPins(ads);
    window.switchForm(mapFilterList, false);
  };

  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (elem, index) {
      fragment.appendChild(window.renderPin(elem, index));
    });
    document.querySelector('.map__pins').appendChild(fragment);
  };

  var drawFilteredPins = function (ads) {
    var selectedFeatures = Array.from(document.querySelectorAll('.map__checkbox:checked'))
      .map(function (checkbox) {
        return checkbox.value;
      });
    filteredData = window.filter.getFiltered(ads, window.filter.filtrationItem.bind(null, 'type'), typeSelect);
    filteredData = window.filter.getFiltered(filteredData, window.filter.filtrationItem.bind(null, 'rooms'), roomsSelect);
    filteredData = window.filter.getFiltered(filteredData, window.filter.filtrationItem.bind(null, 'guests'), guestSelect);
    filteredData = window.filter.getFiltered(filteredData, window.filter.filterByHousingPrice, priceSelect);
    var filteredFeatures = window.filter.getFiltered(filteredData, window.filter.filterByFeatures, selectedFeatures);
    filteredData = filteredData.length > 5 ? filteredFeatures.slice(0, 5) : filteredFeatures;
    window.map.deleteAllUserAds();
    renderPins(filteredData);
  };

  var changeFilterHandler = function () {
    window.debounce(drawFilteredPins.bind(null, data));
  };

  mapFilters.addEventListener('change', changeFilterHandler);

  var renderCards = function (id) {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    var cardsFragment = document.createDocumentFragment();
    cardsFragment.appendChild(window.renderCard(filteredData[id]));
    mapMain.insertBefore(cardsFragment, mapFiltersContainer);
  };

  var onErrorLoadHandler = function (errorMessage) {
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
    deleteActivePin();
  };

})();
