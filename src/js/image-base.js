// Базовые типы данных, от которых наследуются конкретные типы данных.

'use strict';

(function() {
  var arrNewData = [];
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
  * @return {Object}
  */
  // Данный метод возвращает объект с данными
  ImagesBase.prototype.getData = function() {
    return this._data;
  };

  ImagesBase.prototype.getIndex = function() {
    return this._index;
  }

  /**
  * @param {Object} data
  */
  // Данный метод записывает данные
  ImagesBase.prototype.setData = function(data, index) {
    this._data = data;
    this._index = index;
  };

  ImagesBase.prototype.setServerData = function(data) {
    arrNewData = arrNewData.concat(data);
    return console.log(arrNewData);
  };

  ImagesBase.prototype.addServerData = function(data) {
    var oldArrData = [];
    for (var i = 0; i < arrNewData.length; i++) {
      oldArrData[i] = arrNewData[i];
    }
    console.log(oldArrData);

    arrNewData = arrNewData.concat(data);
    console.log(arrNewData);

    if (arrNewData.length > oldArrData.length) {
      console.log('больше');
      var jsonData = JSON.stringify(arrNewData);
      localStorage.setItem('data', jsonData);
    }
  };

  ImagesBase.prototype.getServerData = function() {
    var jsonData = localStorage.getItem('data');
    if (jsonData == null || jsonData == 'undefined') {
      return 'empty';
    } else {
      var dataFromJson = JSON.parse(jsonData);
      return dataFromJson;
    }
  };

  ImagesBase.prototype.addEditServerData = function(data, index) {
    arrNewData[index].comment = data;
    console.log(arrNewData);
    var jsonData = JSON.stringify(arrNewData);
    localStorage.setItem('data', jsonData);
  };

  // Прокидываем в глобальный объект
   window.ImagesBase = ImagesBase;

})();