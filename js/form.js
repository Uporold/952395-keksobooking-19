'use strict';
(function () {
  var notice = document.querySelector('.notice');
  var adFormElementList = notice.querySelectorAll('.ad-form__element');


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
})();
