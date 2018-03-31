(function() {

  var bodyTag = document.querySelector('body');

  function ImagePopup() {
    this.element = document.querySelector('.popup-image');

    // Фиксируем контекст в конструкторе
    this._onOverlayClick = this._onOverlayClick.bind(this);
    this._onEscClick = this._onEscClick.bind(this);
  };

  ImagePopup.prototype = new ImagesBase();

  // Показ модульного окна картинки
  ImagePopup.prototype.render = function() {
    this.element.classList.remove('popup-image--hidden');
    bodyTag.classList.add('body-noscroll');

    this.element.querySelector('.popup-image__img').src = this.getData().getPictures();
    this.element.querySelector('.popup-image__comment').textContent = this.getData().getComments();

    window.addEventListener('click', this._onOverlayClick);
    window.addEventListener('keydown', this._onEscClick);
  };

  // Закрытие модульного окна
  ImagePopup.prototype.remove = function() {
    this.element.classList.add('popup-image--hidden');
    bodyTag.classList.remove('body-noscroll');

    window.removeEventListener('click', this._onOverlayClick);
    window.removeEventListener('keydown', this._onEscClick);
  };

  /**
   * Обработчик клика вне модульного окна
   * @private
   */
  ImagePopup.prototype._onOverlayClick = function(evt) {
    if (evt.target == this.element) {
      this.remove();
    }
  };

  /**
   * Обработчик кнопки Esc
   * @private
   */
  ImagePopup.prototype._onEscClick = function(evt) {
    if (evt.keyCode == 27) {
      this.remove();
    }
  };

  // Прокидываем в глобальный объект
  window.ImagePopup = ImagePopup;

})();