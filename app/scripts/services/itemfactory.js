'use strict';

/**
 * @ngdoc service
 * @name catReceiptApp.ItemFactory
 * @description
 * # ItemFactory
 * Factory in the catReceiptApp.
 */
angular.module('catReceiptApp')
  .factory('ItemFactory', [

    '$http',
    function ($http) {
    // Service logic
    // ...

    // Public API here
    return {
      request: function () {
        return $http.get('data/items.json');
      },
      parse: function(ItemService, response) {
        var item;

        for(var i = 0; i < response.data.items.length; i++) {
          item = response.data.items[i];

          ItemService.addItem(
            item.name,
            item.cost,
            item.owner,
            item.stock,
            true);
        }

        ItemService.flush();
      }
    };
  }]);
