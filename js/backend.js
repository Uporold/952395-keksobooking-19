'use strict';

window.backend = (function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  // var DESTINATION = 'https://js.dump.academy/keksobooking/';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var xhrHandler = function (onLoad, onError, method, url, formData) {
    var xhrObject = new XMLHttpRequest();
    xhrObject.responseType = 'json';
    xhrObject.addEventListener('load', function () {
      if (xhrObject.status === StatusCode.OK) {
        onLoad(xhrObject.response);
      } else {
        onError('Статус ответа: ' + xhrObject.status + ' ' + xhrObject.statusText);
      }
    });
    xhrObject.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhrObject.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhrObject.timeout + 'мс');
    });

    xhrObject.timeout = TIMEOUT_IN_MS; // 10s
    xhrObject.open(method, url);

    xhrObject.send(formData);

  };

  return {
    load: function (onLoad, onError) {
      xhrHandler(onLoad, onError, 'GET', URL);

    }
    /* save: function (formData, onLoad, onError, xhrSave) {
      xhrHandler(onLoad, onError, xhrSave, 'POST', DESTINATION, formData);
    }*/
  };
})();
