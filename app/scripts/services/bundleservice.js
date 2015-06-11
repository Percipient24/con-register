'use strict';

/**
 * @ngdoc service
 * @name catReceiptApp.BundleService
 * @description
 * # BundleService
 * Service in the catReceiptApp.
 */
angular.module('catReceiptApp')
  .service('BundleService', [

    'BundleFactory',
  	function (BundleFactory) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var that = this;
    
    this.bundles = [];

    this.nukeBundles = function() {
    	while(this.bundles.length > 0) {
            this.bundles.pop();
        }

    	localStorage.setItem('BundleService_bundles', JSON.stringify(this.bundles));
    };

    this.flush = function() {
    	localStorage.setItem('BundleService_bundles', JSON.stringify(this.bundles));    	
    };

    this.addBundle = function(item_name, item_cost, item_owner, batch) {
    	var item = {
    		name: item_name,
    		cost: item_cost,
    		owner: item_owner,
    		bundle: true
    	}

    	this.bundles.push(item);
    	
    	if(!batch) {
    		this.flush();
    	}
    };

    if(!localStorage.getItem('BundleService_bundles') || JSON.parse(localStorage.getItem('BundleService_bundles')).length === 0) {
    	// first time
        BundleFactory.request().then(function(response){
            BundleFactory.parse(that, response);
        });
    } else {
    	// every other time
    	this.bundles = JSON.parse(localStorage.getItem('BundleService_bundles'));
    }
  }
]);
