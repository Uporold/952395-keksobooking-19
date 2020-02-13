'use strict';
(function () {
  var notice = document.querySelector('.notice');
  var adFormElementList = notice.querySelectorAll('.ad-form__element');
  var adForm = notice.querySelector('.ad-form');
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var controlAdForm = function (option) {
    for (var i = 0; i < adFormElementList.length; ++i) {
      var item = adFormElementList[i];
      item.disabled = option;
    }
  };
  controlAdForm(true);
  window.controlAdForm = controlAdForm;

  var roomNumber = notice.querySelector('#room_number');
  var capacity = notice.querySelector('#capacity');
  var timeIn = notice.querySelector('#timein');
  var timeOut = notice.querySelector('#timeout');
  var price = notice.querySelector('#price');
  var type = notice.querySelector('#type');

  var checkTime = function (evt, time) {
    time.value = evt.target.value;
  };

  var getMinPriceOfType = function (evt) {
    var minPrice = {bungalo: 0, flat: 1000, house: 5000, palace: 10000};
    price.placeholder = minPrice[evt.target.value];
    price.min = minPrice[evt.target.value];
  };

  timeIn.addEventListener('change', function (evt) {
    checkTime(evt, timeOut);
  });

  timeOut.addEventListener('change', function (evt) {
    checkTime(evt, timeIn);
  });

  type.addEventListener('change', function (evt) {
    getMinPriceOfType(evt);
  });

  var getCapacityFromRoomsNumber = function (evt) {
    var target = evt.target.value;
    for (var i = 0; i < capacity.length; i++) {
      var item = capacity.options[i];
      item.disabled = target === '100' ? item.value !== '0' : item.value > target || item.value === '0';
      item.selected = item.value === target || (item.value === '0' && target === '100');
    }
  };

  roomNumber.addEventListener('change', function (evt) {
    getCapacityFromRoomsNumber(evt);
  });

  var saveHandler = function () {
    adForm.reset();
    successMessage();
    window.map.deleteAllUserAds();
    window.map.deactivateMap();
  };

  var successMessage = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    document.addEventListener('click', onClickCloseSuccessMessage);
    document.addEventListener('keydown', onEscCloseSuccessMessage);

    return document.body.appendChild(successElement);
  };

  var errorMessage = function () {
    var main = document.querySelector('main');

    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    window.errorButton = errorElement.querySelector('.error__button');
    window.errorButton.addEventListener('click', onClickCloseErrorMessage);
    document.addEventListener('click', onClickCloseErrorMessage);
    document.addEventListener('keydown', onEscCloseErrorMessage);

    return main.appendChild(errorElement);
  };

  var closeMessage = function (element) {
    document.querySelector(element).remove();
  };

  var resetButton = adForm.querySelector('.ad-form__reset');

  var clearForm = function () {
    adForm.reset();
    window.map.getPinMainCoordinates();
  };

  var onEnterClearForm = function (evt) {
    if (evt.key === ENTER_KEY) {
      evt.preventDefault();
      clearForm();
    }
  };

  var onMouseButtonClearForm = function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      clearForm();
    }
  };

  resetButton.addEventListener('click', onMouseButtonClearForm);
  resetButton.addEventListener('keydown', onEnterClearForm);

  var successMessageEvtListenerRemover = function () {
    document.removeEventListener('keydown', onEscCloseSuccessMessage);
    document.removeEventListener('click', onClickCloseSuccessMessage);
  };

  var onEscCloseSuccessMessage = function (evt) {
    if (evt.key === ESC_KEY) {
      closeMessage('.success');
      successMessageEvtListenerRemover();
    }
  };

  var onClickCloseSuccessMessage = function (evt) {
    if (evt.button === 0) {
      closeMessage('.success');
      successMessageEvtListenerRemover();
    }
  };

  var errorMessageEvtListenerRemover = function () {
    window.errorButton.removeEventListener('click', onClickCloseErrorMessage);
    document.removeEventListener('click', onClickCloseErrorMessage);
    document.removeEventListener('keydown', onEscCloseErrorMessage);
  };
  var onEscCloseErrorMessage = function (evt) {
    if (evt.key === ESC_KEY) {
      closeMessage('.error');
      errorMessageEvtListenerRemover();
    }
  };

  var onClickCloseErrorMessage = function (evt) {
    if (evt.button === 0) {
      closeMessage('.error');
      errorMessageEvtListenerRemover();
    }
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), saveHandler, errorMessage);
    evt.preventDefault();
  });
})();
