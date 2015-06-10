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

  	function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
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

    if(!localStorage.getItem('BundleService_bundles')) {
    	// first time
    	this.flush();
    } else {
    	// every other time
    	this.bundles = JSON.parse(localStorage.getItem('BundleService_bundles'));
    }
  }
]);
