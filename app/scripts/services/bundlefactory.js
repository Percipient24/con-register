'use strict';

/**
 * @ngdoc service
 * @name catReceiptApp.BundleFactory
 * @description
 * # BundleFactory
 * Factory in the catReceiptApp.
 */
angular.module('catReceiptApp')
  .factory('BundleFactory', [

    '$http',
    function ($http) {
    // Service logic
    // ...

    // Public API here
    return {
      request: function () {
        return $http.get('data/bundles.json');
      },
      parse: function(BundleService, response) {
        var item;

        for(var i = 0; i < response.data.bundles.length; i++) {
          item = response.data.bundles[i];

          BundleService.addBundle(
            item.name,
            item.cost,
            item.owner,
            true);
        }

        BundleService.flush();
      }
    };
  }]);
