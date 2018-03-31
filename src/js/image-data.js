'use strict';

(function() {

  /**
   * @param {Object} data
   * @constructor
  */
  var ImagesData = function(data) {
    this.params = data;
  };

  // Используем методы для доступа к данным
  ImagesData.prototype.getPictures = function() {
    return this.params.url;
  };

  ImagesData.prototype.getComments = function() {
    return this.params.comment;
  };

  // Прокидываем в глобальный объект
  window.ImagesData = ImagesData;

})();