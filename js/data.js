'use strict';
(function () {
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

  var pinsBlock = document.querySelector('.map__pins');
  var offerPins = {
    height: 68,
    width: 50
  };

  var ads = [];
  window.ads = ads;

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
    return shuffleArray(array).slice(0, getRandomIntLimited(1, array.length));
  };

  var generateRandomAd = function () {
    var location = {
      x: getRandomIntLimited(25, pinsBlock.clientWidth - 25),
      y: getRandomIntLimited(130 - offerPins.height, 630 - offerPins.height)
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
  createAdsArray(OBJECTS_AMOUNT);
})();
