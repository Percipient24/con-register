'use strict';

/**
 * @ngdoc service
 * @name catReceiptApp.ItemService
 * @description
 * # ItemService
 * Service in the catReceiptApp.
 */
angular.module('catReceiptApp')
  .service('ItemService', [

  	'ItemFactory',
  	function (ItemFactory) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    var that = this;

    this.items = [];

    this.nukeItems = function() {
    	while(this.items.length > 0) {
    		this.items.pop();    		
    	}
    	localStorage.setItem('ItemService_items', JSON.stringify(this.items));
    };

    this.flush = function() {
    	localStorage.setItem('ItemService_items', JSON.stringify(this.items));    	
    };

    this.addItem = function(item_name, item_cost, item_owner, item_stock, batch) {
    	var item = {
    		name: item_name,
    		cost: item_cost,
    		owner: item_owner,
    		stock: item_stock
    	}

    	this.items.push(item);
    	
    	if(!batch) {
    		this.flush();
    	}
    };

    if(!localStorage.getItem('ItemService_items') || JSON.parse(localStorage.getItem('ItemService_items')).length === 0) {
    	// first time
    	ItemFactory.request().then(function(response){
    		ItemFactory.parse(that, response);
    	});
    } else {
    	// every other time
    	this.items = JSON.parse(localStorage.getItem('ItemService_items'));
    }
  }
]);
