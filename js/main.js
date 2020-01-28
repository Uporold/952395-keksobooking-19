'use strict';
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pinsBlock = document.querySelector('.map__pins');

var AVATAR_IMG_IDS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6'];
var PRICES = [1000, 1337, 2000, 5000, 100500];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4];
var GUESTS = [1, 2, 3, 4];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwater', 'parking', 'washer', 'elevator', 'conditioner'];
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

var getUniqueAvatar = function (array) {
  return array.shift();
};

var generateRandomAd = function () {
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
      features: FEATURES[getRandomItem(FEATURES)],
      description: DESCRIPTIONS[getRandomItem(DESCRIPTIONS)],
      photos: PHOTOS[getRandomItem(PHOTOS)]
    },
    location: {
      x: getRandomIntLimited(25, pinsBlock.clientWidth - 25),
      y: getRandomIntLimited(130, 630)
    }
  };
};

var createAdsArray = function (amount) {
  for (var i = 0; i < amount; i++) {
    ads.push(generateRandomAd());
  }
};

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

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  return document.querySelector('.map__pins').appendChild(fragment);
};
renderPins();
