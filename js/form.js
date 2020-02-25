'use strict';
(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var mapFilters = document.querySelector('.map__filters');
  var mapFilterList = mapFilters.querySelectorAll('*');
  var notice = document.querySelector('.notice');
  var adFormElementList = notice.querySelectorAll('.ad-form__element');
  var adForm = notice.querySelector('.ad-form');
  var mapFeatures = mapFilters.querySelectorAll('.map__checkbox');
  var formFeatures = adForm.querySelectorAll('.feature__checkbox');
  var titleInput = adForm.querySelector('#title');
  var priceInput = adForm.querySelector('#price');

  var resetButton = adForm.querySelector('.ad-form__reset');

  var roomNumber = notice.querySelector('#room_number');
  var capacity = notice.querySelector('#capacity');
  var timeIn = notice.querySelector('#timein');
  var timeOut = notice.querySelector('#timeout');
  var price = notice.querySelector('#price');
  var type = notice.querySelector('#type');

  var switchForm = function (list, option) {
    for (var i = 0; i < list.length; ++i) {
      var item = list[i];
      item.disabled = option;
    }
  };

  switchForm(adFormElementList, true);
  switchForm(mapFilterList, true);
  document.querySelector('#avatar').disabled = true;
  document.querySelector('#images').disabled = true;
  window.switchForm = switchForm;

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
    clearForm();
    showSuccessMessage();
    window.map.deleteAllUserAds();
    window.map.deactivateMap();
  };

  var showSuccessMessage = function () {
    var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    document.addEventListener('click', onClickCloseSuccessMessage);
    document.addEventListener('keydown', onEscCloseSuccessMessage);

    return document.body.appendChild(successElement);
  };

  var showErrorMessage = function () {
    var main = document.querySelector('main');

    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');
    errorButton.addEventListener('click', onClickCloseErrorMessage);
    document.addEventListener('click', onClickCloseErrorMessage);
    document.addEventListener('keydown', onEscCloseErrorMessage);

    return main.appendChild(errorElement);
  };

  var closeMessage = function (element) {
    document.querySelector(element).remove();
  };

  var clearForm = function () {
    adForm.reset();
    document.querySelector('.user-pic').src = 'img/muffin-grey.svg';
    document.querySelector('.house-pic').src = 'img/muffin-grey.svg';
    window.map.clearFilters();
    price.placeholder = 0;
    price.min = 0;
    window.map.deactivateMap();
    window.map.deleteAllUserAds();
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

  var removeSuccessMessageEvtListener = function () {
    document.removeEventListener('keydown', onEscCloseSuccessMessage);
    document.removeEventListener('click', onClickCloseSuccessMessage);
  };

  var onEscCloseSuccessMessage = function (evt) {
    if (evt.key === ESC_KEY) {
      closeMessage('.success');
      removeSuccessMessageEvtListener();
    }
  };

  var onClickCloseSuccessMessage = function (evt) {
    if (evt.button === 0) {
      closeMessage('.success');
      removeSuccessMessageEvtListener();
    }
  };

  var removeErrorMessageEvtListener = function () {
    document.removeEventListener('click', onClickCloseErrorMessage);
    document.removeEventListener('keydown', onEscCloseErrorMessage);
  };
  var onEscCloseErrorMessage = function (evt) {
    if (evt.key === ESC_KEY) {
      closeMessage('.error');
      removeErrorMessageEvtListener();
    }
  };

  var onClickCloseErrorMessage = function (evt) {
    if (evt.button === 0) {
      closeMessage('.error');
      removeErrorMessageEvtListener();
    }
  };

  var checkboxCheck = function (evt) {
    if (evt.key === ENTER_KEY) {
      evt.preventDefault();
      evt.currentTarget.click();
    }
  };

  var checkFeatures = function (checkboxes) {
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('keydown', checkboxCheck);
    });
  };
  checkFeatures(mapFeatures);
  checkFeatures(formFeatures);

  var validate = function (input) {
    if (input.value === '') {
      input.style.border = '2px solid red';
      return false;
    } else if (input.value) {
      input.style.border = '1px solid #d9d9d3';
    }
    return true;
  };

  var validateFields = function () {
    var titleValidation = validate(titleInput);
    var priceValidation = validate(priceInput);
    return titleValidation && priceValidation;
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (validateFields()) {
      window.backend.save(new FormData(adForm), saveHandler, showErrorMessage);
    }
  });
})();
