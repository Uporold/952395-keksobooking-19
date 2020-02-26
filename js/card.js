'use strict';

(function () {
  var typeTranslate = function (data) {
    var type = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    };
    return type[data];
  };

  var convertTextForms = function (n, textForms) {
    if (n > 1 && n < 5) {
      return textForms[1];
    }
    if (n >= 5 || n === 0) {
      return textForms[2];
    }
    return textForms[0];
  };

  var roomsTransformWords = function (num) {
    var words = ['комната', 'комнаты', 'комнат'];
    return convertTextForms(num, words);
  };

  var guestsTransformWords = function (num) {
    var words = ['гостя', 'гостей', 'гостей'];
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
    if (!features.length) {
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
    if (!photos.length) {
      element.querySelector('.popup__photos').remove();
    }
  };

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');


  window.renderCard = function (ad) {
    var cardElement = cardTemplate.cloneNode(true);

    var createContent = function (className, data, property) {
      var element = cardElement.querySelector(className);
      property = property || 'textContent';
      if (data) {
        element[property] = data;
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
        'Заезд после ' + ad.offer.checkin + ' выезд до ' + ad.offer.checkout);
    renderFeatures(cardElement, ad.offer.features);
    createContent('.popup__description', ad.offer.description);
    renderPhotos(cardElement, ad.offer.photos);
    createContent('.popup__avatar', ad.author.avatar, 'src');

    cardElement.querySelector('.popup__close').addEventListener('click', window.map.onMouseButtonCloseCard);
    cardElement.querySelector('.popup__close').addEventListener('keydown', window.map.onEnterCloseCard);
    document.addEventListener('keydown', window.map.onEscCloseCard);

    return cardElement;
  };
})();
