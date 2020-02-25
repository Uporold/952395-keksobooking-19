'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var imagePreview = function (input, previewDestination) {


    var fileChooser = document.querySelector(input);
    var preview = document.querySelector(previewDestination);

    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };
  imagePreview('#avatar', '.user-pic');
  imagePreview('#images', '.house-pic');
})();
