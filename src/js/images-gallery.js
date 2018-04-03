(function() {

  var container = document.querySelector('.images__list');
  var loadedImages = []; // изначальный список картинок (массив объектов)
  var btnAddImage = document.querySelector('.page-header__add-image');
  var popupAddImage = document.querySelector('.popup-add-image');
  var bodyTag = document.querySelector('body');

  getImages();

  btnAddImage.addEventListener('click', function(evt) {
    evt.preventDefault();
    popupAddImage.classList.remove('popup-add-image--hidden');
    bodyTag.classList.add('body-noscroll');
    window.addEventListener('click', onOverLayClick);
    window.addEventListener('keydown', onEscClick);
  });

  function onOverLayClick(evt) {
    if (evt.target == popupAddImage) {
      closePopup();
    }
  };

  function onEscClick(evt) {
    if (evt.keyCode == 27) {
      closePopup();
    }
  };

  function closePopup() {
    popupAddImage.classList.add('popup-add-image--hidden');
    bodyTag.classList.remove('body-noscroll');
    window.removeEventListener('click', onOverLayClick);
    window.removeEventListener('keydown', onEscClick);
  };

  function renderImages(imageElement) {
    // Создаем фрагмент для экономии памяти
    var fragment = document.createDocumentFragment();

    imageElement.map(function(image) {
      var imgPreview = new ImagePreview();
      imgPreview.setData(image);
      imgPreview.render();
      fragment.appendChild(imgPreview.element);
      
      // Используем способ колбека. Использование заранее определенных в объекте функций обратного вызова.
      // Аналог DOM Events Level 0 только для компонент.
      var popupImage = new ImagePopup();
      imgPreview.onClick = function() {
        popupImage.setData(imgPreview.getData());
        popupImage.show();
      };

      return imgPreview;
    });
    container.appendChild(fragment);
  }

  function getImages() {
    var data = new ImagesBase();
    loadedImages = data.getServerData();
    
    if (loadedImages == 'empty') {
      return;
    } else {
      data.setServerData(loadedImages);
      console.log(loadedImages);
      loadedImages = loadedImages.map(function(image) {
        return new ImagesData(image);
      });
    }
    
    console.log(loadedImages);
    // Обработка загруженных данных (отрисовка)
    renderImages(loadedImages);

    /*var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data/data-img.json');
    xhr.onload = function(evt) {
      var rawData = evt.target.response;
      loadedImages = JSON.parse(rawData);
      console.log(loadedImages);

      var setData = new ImagesBase();
      setData.setServerData(loadedImages);
      // Перезаписываем скачанный напрямую массив объектов (список картинок)
      // в массив объектов ImagesData у которых теперь есть свои методы (показа и записи)
      loadedImages = loadedImages.map(function(image) {
        return new ImagesData(image);
      });
      console.log(loadedImages);
      // Обработка загруженных данных (отрисовка)
      renderImages(loadedImages);
    };

    xhr.send();*/
  }

})();