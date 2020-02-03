'use strict';
var map = document.querySelector('.map');
// map.classList.remove('map--faded');
var pinsBlock = document.querySelector('.map__pins');

var AVATAR_IMG_IDS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6'];
var PRICES = [1000, 1337, 2000, 5000, 100500];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3];
var GUESTS = [1, 2];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Описание 1', 'Описание 2', 'Описание 3', 'Описание 4', 'Описание 5'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var OBJECTS_AMOUNT = 8;

var ads = [];

var getRandomItem = function (array) {
  return Math.floor(Math.random() * array.length);
};

var getRandomIntLimited = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function shuffleArray(array) {
  var j;
  var temp;
  for (var i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
}

var getUniqueAvatar = function (array) {
  return shuffleArray(array).shift();
};

var getRandomElementsArray = function (array) {
  return shuffleArray(array).splice(0, getRandomIntLimited(1, array.length));
};

var generateRandomAd = function () {
  var location = {
    x: getRandomIntLimited(25, pinsBlock.clientWidth - 25),
    y: getRandomIntLimited(130, 630)
  };
  return {
    author: {
      avatar: 'img/avatars/user' + getUniqueAvatar(AVATAR_IMG_IDS) + '.png',
    },
    offer: {
      title: TITLES[getRandomItem(TITLES)],
      address: location.x + ', ' + location.y,
      price: PRICES[getRandomItem(PRICES)],
      type: TYPES[getRandomItem(TYPES)],
      rooms: ROOMS[getRandomItem(ROOMS)],
      guests: GUESTS[getRandomItem(GUESTS)],
      checkin: CHECKINS[getRandomItem(CHECKINS)],
      checkouts: CHECKOUTS[getRandomItem(CHECKOUTS)],
      features: getRandomElementsArray(FEATURES),
      description: DESCRIPTIONS[getRandomItem(DESCRIPTIONS)],
      photos: getRandomElementsArray(PHOTOS)
    },
    location: location
  };
};

var createAdsArray = function (amount) {
  for (var i = 1; i <= amount; i++) {
    ads.push(generateRandomAd(i));
  }
};

/* var typeTranslate = function (data) {
  var type = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  return type[data];
};*/

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

createAdsArray(OBJECTS_AMOUNT);

var renderPin = function (ad) {
  var pinElement = mapPinTemplate.cloneNode(true);

  pinElement.style = 'left: ' + ad.location.x + 'px; top: ' + ad.location.y + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;
  return pinElement;
};

/* var convertTextForms = function (n, textForms) {
  n = n % 10;
  if (n > 1 && n < 5) {
    return textForms[1];
  }
  return textForms[0];
};

var roomsTransformWords = function (num) {
  var words = ['комната', 'комнаты'];
  return convertTextForms(num, words);
};

var guestsTransformWords = function (num) {
  var words = ['гостя', 'гостей'];
  return convertTextForms(num, words);
};

var renderFeatures = function (element, features) {
  element.querySelector('.popup__features').innerHTML = '';
  var featuresFragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var newFeature = document.createElement('li');
    newFeature.className = 'popup__feature popup__feature--' + features[i];
    featuresFragment.appendChild(newFeature);
  }
  element.querySelector('.popup__features').appendChild(featuresFragment);
  if (features.length === 0) {
    element.querySelector('.popup__features').remove();
  }
};

var renderPhotos = function (element, photos) {
  element.querySelector('.popup__photos').innerHTML = '';
  var photosFragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    var newPhoto = document.createElement('img');
    newPhoto.className = 'popup__photo';
    newPhoto.src = photos[i];
    newPhoto.width = 45;
    newPhoto.height = 40;
    newPhoto.alt = 'Фотография жилья';

    photosFragment.appendChild(newPhoto);
  }
  element.querySelector('.popup__photos').appendChild(photosFragment);
  if (photos.length === 0) {
    element.querySelector('.popup__photos').remove();
  }
};

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');


var renderCard = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);

  var createContent = function (className, data) {
    var element = cardElement.querySelector(className);
    if (data) {
      if (data === ad.author.avatar) {
        element.src = data;
      } else {
        element.textContent = data;
      }
    } else {
      element.remove();
    }
  };

  createContent('.popup__title', ad.offer.title);
  createContent('.popup__text--address', ad.offer.address);
  createContent('.popup__text--price', ad.offer.price + '₽/ночь');
  createContent('.popup__type', typeTranslate(ad.offer.type));
  createContent('.popup__text--capacity',
      ad.offer.rooms + ' ' + roomsTransformWords(ad.offer.rooms) + ' для ' + ad.offer.guests + ' ' + guestsTransformWords(ad.offer.guests));
  createContent('.popup__text--time',
      'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkouts);
  renderFeatures(cardElement, ad.offer.features);
  createContent('.popup__description', ad.offer.description);
  renderPhotos(cardElement, ad.offer.photos);
  createContent('.popup__avatar', ad.author.avatar);

  return cardElement;
}; */

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  document.querySelector('.map__pins').appendChild(fragment);
};

// var mapFiltersContainer = document.querySelector('.map__filters-container');

/* var renderCards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 1; i++) {
    fragment.appendChild(renderCard(ads[i]));
  }
  map.insertBefore(fragment, mapFiltersContainer);
};*/


// renderCards();
var notice = document.querySelector('.notice');
var adFormElementList = notice.querySelectorAll('.ad-form__element');
var adForm = notice.querySelector('.ad-form');
var ENTER_KEY = 'Enter';
var pin = {
  height: 62,
  width: 62
};
var pinAfter = {
  height: 22,
  width: 10
};
/* for (var item of adFormElementList) {
  item.disabled = true;
}*/
var controlAdForm = function (option) {
  for (var i = 0; i < adFormElementList.length; ++i) {
    var item = adFormElementList[i];
    item.disabled = option;
  }
};
controlAdForm(true);

var mapPinMain = document.querySelector('.map__pin--main');
var addressInput = document.querySelector('#address');
var getPinMainCoordinates = function () {
  var getIntCoordinates = function (value) {
    return parseInt(value, 10);
  };
  var y = getIntCoordinates(mapPinMain.style.top) + pin.height + pinAfter.height;
  var x = getIntCoordinates(mapPinMain.style.left) + pin.width / 2 + pinAfter.width / 2;
  addressInput.value = x + ', ' + y;
};

var activateMap = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  controlAdForm(false);
  getPinMainCoordinates();
  renderPins();
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activateMap();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activateMap();
  }
});

var roomNumber = notice.querySelector('#room_number');
var capacity = notice.querySelector('#capacity');
var timeIn = notice.querySelector('#timein');
var timeOut = notice.querySelector('#timeout');
var price = notice.querySelector('#price');
var type = notice.querySelector('#type');

var checkTime = function (evt, time) {
  var target = evt.target;
  if (target.value === '12:00') {
    time.value = '12:00';
  } else if (target.value === '13:00') {
    time.value = '13:00';
  } else if (target.value === '14:00') {
    time.value = '14:00';
  }
};

var getMinPriceOfType = function (evt) {
  var target = evt.target;
  if (target.value === 'bungalo') {
    price.placeholder = 0;
    price.min = 0;
  }
  if (target.value === 'flat') {
    price.placeholder = 1000;
    price.min = 1000;
  }
  if (target.value === 'house') {
    price.placeholder = 5000;
    price.min = 5000;
  }
  if (target.value === 'palace') {
    price.placeholder = 10000;
    price.min = 10000;
  }
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
  var target = evt.target;
  if (target.value === '1') {
    capacity.value = 1;
    capacity.options[0].disabled = true;
    capacity.options[1].disabled = true;
    capacity.options[2].disabled = false;
    capacity.options[3].disabled = true;
  } else if (target.value === '2') {
    capacity.value = 2;
    capacity.options[0].disabled = true;
    capacity.options[1].disabled = false;
    capacity.options[2].disabled = false;
    capacity.options[3].disabled = true;
  } else if (target.value === '3') {
    capacity.value = 3;
    capacity.options[0].disabled = false;
    capacity.options[1].disabled = false;
    capacity.options[2].disabled = false;
    capacity.options[3].disabled = true;
  } else if (target.value === '100') {
    capacity.value = 0;
    capacity.options[0].disabled = true;
    capacity.options[1].disabled = true;
    capacity.options[2].disabled = true;
    capacity.options[3].disabled = false;
  }
};

roomNumber.addEventListener('change', function (evt) {
  getCapacityFromRoomsNumber(evt);
});


