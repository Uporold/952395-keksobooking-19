'use strict';

(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  window.filter = {
    filterByHousingPrice: function (ad, element) {
      switch (element.value) {
        case 'low':
          return (ad.offer.price < MIN_PRICE);
        case 'middle':
          return (ad.offer.price <= MAX_PRICE && ad.offer.price >= MIN_PRICE);
        case 'high':
          return (ad.offer.price >= MAX_PRICE);
        default:
          return true;
      }
    },

    filterByFeatures: function (ad, selectedFeatures) {
      return selectedFeatures.every(function (featureElement) {
        return ad.offer.features.includes(featureElement);
      });
    },

    filtrationItem: function (key, item, element) {
      return element.value === 'any' ? true : element.value === item.offer[key].toString();
    },

    getFiltered: function (array, cb, element) {
      var filtered = [];
      var isAny = (Array.isArray(element) && !element.length) || element.value === 'any';
      for (var i = 0; i < array.length; i++) {
        if (cb(array[i], element)) {
          filtered.push(array[i]);
        }
        if (!isAny && filtered.length >= 5) {
          break;
        }
      }
      return filtered;
    }
  };
})();
