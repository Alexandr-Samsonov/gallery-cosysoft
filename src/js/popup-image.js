(function() {

  var bodyTag = document.querySelector('body');
  var editButton = document.querySelector('.popup-image__button-edit');
  var context;

  function ImagePopup() {
    this.element = document.querySelector('.popup-image');
    // Фиксируем контекст в конструкторе
    this._onOverlayClick = this._onOverlayClick.bind(this);
    this._onEscClick = this._onEscClick.bind(this);
  };

  ImagePopup.prototype = new ImagesBase();

  // Показ модульного окна картинки
  ImagePopup.prototype.show = function() {
    this.element.classList.remove('popup-image--hidden');
    bodyTag.classList.add('body-noscroll');
    context = this;

    this.element.querySelector('.popup-image__img').src = this.getData().getPictures();
    this.element.querySelector('.popup-image__comment').textContent = this.getData().getComments();
    
    editButton.addEventListener('click', this._onEditComment);
    window.addEventListener('click', this._onOverlayClick);
    window.addEventListener('keydown', this._onEscClick);
  };

  // Закрытие модульного окна
  ImagePopup.prototype.close = function() {
    this.element.classList.add('popup-image--hidden');
    bodyTag.classList.remove('body-noscroll');

    editButton.removeEventListener('click', this._onEditComment);
    window.removeEventListener('click', this._onOverlayClick);
    window.removeEventListener('keydown', this._onEscClick);
  };

  /**
   * Обработчик клика вне модульного окна
   * @private
   */
  ImagePopup.prototype._onOverlayClick = function(evt) {
    if (evt.target == this.element) {
      this.close();
    }
  };

  /**
   * Обработчик кнопки Esc
   * @private
   */
  ImagePopup.prototype._onEscClick = function(evt) {
    if (evt.keyCode == 27) {
      this.close();
    }
  };

  /**
   * Обработчик клика по кнопке Изменить
   * @private
   */
  ImagePopup.prototype._onEditComment = function() {
    var wrapper = this.parentNode;
    console.log(wrapper);
    console.log(this);
    var comment = wrapper.querySelector('.popup-image__comment');
    var commentfield = wrapper.querySelector('.popup-image__commentfield');
    var isEditing = wrapper.classList.contains('editing');

    if (isEditing) {
      var editComment = commentfield.value;
      var index = context.getIndex();
      console.log(index);
      comment.innerText = editComment;
      this.innerText = 'Изменить';
      context.addEditServerData(editComment, index);
    } else {
      commentfield.value = comment.innerText;
      this.innerText = 'Сохранить';
    }

    wrapper.classList.toggle('editing');
  };

  // Прокидываем в глобальный объект
  window.ImagePopup = ImagePopup;

})();