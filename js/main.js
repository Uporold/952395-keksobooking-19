'use strict';
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pinsBlock = document.querySelector('.map__pins');


var TITLES = ['Заголовок 1', 'Заголовок 2', 'Заголовок 3', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6'];
var PRICES = [1000, 1337, 2000, 5000, 100500];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5];
var GUESTS = [1, 2, 3, 4];
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

function shuffleArray(arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

var getRandomElementsList = function (arr) {
  return shuffleArray(arr).slice(0, getRandomIntLimited(1, arr.length));
};

var generateRandomAd = function (i) {
  var location = {
    x: getRandomIntLimited(25, pinsBlock.clientWidth - 25),
    y: getRandomIntLimited(130, 630)
  };
  return {
    author: {
      avatar: 'img/avatars/user0' + i + '.png',
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
      features: getRandomElementsList(FEATURES),
      description: DESCRIPTIONS[getRandomItem(DESCRIPTIONS)],
      photos: getRandomElementsList(PHOTOS)
    },
    location: location
  };
};

var createAdsArray = function (amount) {
  for (var i = 1; i <= amount; i++) {
    ads.push(generateRandomAd(i));
  }
};

var typeTranslate = function (data) {
  var translate;
  switch (data) {
    case 'flat':
      translate = 'Квартира';
      break;
    case 'bungalo':
      translate = 'Бунгало';
      break;
    case 'house':
      translate = 'Дом';
      break;
    case 'palace':
      translate = 'Дворец';
      break;
  }
  return translate;
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

var numberToString = function (n, textForms) {
  n = Math.abs(n) % 100;
  var n1 = n % 10;
  if (n > 10 && n < 20) {
    return textForms[2];
  }
  if (n1 > 1 && n1 < 5) {
    return textForms[1];
  }
  if (n1 === 1) {
    return textForms[0];
  }
  return textForms[2];
};

var roomsTransformWords = function (num) {
  var words = ['комната', 'комнаты', 'комнат'];
  return numberToString(num, words);
};

var guestsTransformWords = function (num) {
  var words = ['гостя', 'гостей', 'гостей'];
  return numberToString(num, words);
};

var renderFeatures = function (element, features) {
  element.querySelector('.popup__features').innerHTML = '';
  var featuresFragment = document.createDocumentFragment();

  for (var i = 0; i < features.length; i++) {
    var newFeature = document.createElement('li');
    newFeature.className = 'popup__feature popup__feature--' + features[i];
    featuresFragment.appendChild(newFeature);
  }
  if (features.length === 0) {
    return element.querySelector('.popup__features').remove();
  }

  return element.querySelector('.popup__features').appendChild(featuresFragment);
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
  if (photos.length === 0) {
    return element.querySelector('.popup__photos').remove();
  }
  return element.querySelector('.popup__photos').appendChild(photosFragment);

};

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

var renderCard = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = ad.offer.title ? ad.offer.title : cardElement.querySelector('.popup__title').remove();
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.address ? ad.offer.address : cardElement.querySelector('.popup__text--address').remove();
  cardElement.querySelector('.popup__text--price').textContent = ad.offer.price ? ad.offer.price + '₽/ночь' : cardElement.querySelector('.popup__text--price').remove();
  cardElement.querySelector('.popup__type').textContent = ad.offer.type ? typeTranslate(ad.offer.type) : cardElement.querySelector('.popup__type').remove();
  cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms && ad.offer.guests ? ad.offer.rooms + ' ' + roomsTransformWords(ad.offer.rooms) + ' для ' + ad.offer.guests + ' ' + guestsTransformWords(ad.offer.guests) : cardElement.querySelector('.popup__text--capacity').remove();
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkouts;
  cardElement.querySelector('.popup__text--time').textContent = ad.offer.checkin && ad.offer.checkouts ? 'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkouts : cardElement.querySelector('.popup__text--time').remove();
  renderFeatures(cardElement, ad.offer.features);
  cardElement.querySelector('.popup__description').textContent = ad.offer.description ? ad.offer.description : cardElement.querySelector('.popup__description').remove();
  renderPhotos(cardElement, ad.offer.photos);
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar ? ad.author.avatar : cardElement.querySelector('.popup__avatar').remove();

  return cardElement;
};

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  return document.querySelector('.map__pins').appendChild(fragment);
};

var mapFiltersContainer = document.querySelector('.map__filters-container');

var renderCards = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 1; i++) {
    fragment.appendChild(renderCard(ads[i]));
  }
  return map.insertBefore(fragment, mapFiltersContainer);
};

renderPins();
renderCards();
