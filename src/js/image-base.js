// Базовые типы данных, от которых наследуются конкретные типы данных.

'use strict';

(function() {

  /**
   * @constructor
   */
  var ImagesBase = function() {};

  // Определяем свойство data на уровне прототипа объекта ImagesBase
  ImagesBase.prototype._data = null;

  // Определяем базовый метод render
  ImagesBase.prototype.render = function() {};

  // Определяем базовый метод remove
  ImagesBase.prototype.remove = function() {};

  /**
  * @param {Object} data
  */
  // Данный метод записывает данные
  ImagesBase.prototype.setData = function(data) {
    this._data = data;
  };

  /**
  * @return {Object}
  */
  // Данный метод возвращает объект с данными
  ImagesBase.prototype.getData = function() {
    return this._data;
  };

  // Прокидываем в глобальный объект
   window.ImagesBase = ImagesBase;

})();