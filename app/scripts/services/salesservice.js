'use strict';

/**
 * @ngdoc service
 * @name catReceiptApp.SalesService
 * @description
 * # SalesService
 * Service in the catReceiptApp.
 */
angular.module('catReceiptApp')
  .service('SalesService', [

  	function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    this.sales = [];

    this.nukeSales = function() {
    	while(this.sales.length > 0) {
    		this.sales.pop();    		
    	}
    	localStorage.setItem('SalesService_sales', JSON.stringify(this.sales));
    };

    this.addSale = function(cart, total, is_cash) {
    	var sale = {
    		cart: cart,
    		total: total,
    		cash: is_cash,
    		time: (new Date()).getTime()
    	}
    	this.sales.push(sale);
    	localStorage.setItem('SalesService_sales', JSON.stringify(this.sales));    
    };

    if(!localStorage.getItem('SalesService_sales')) {
    	localStorage.setItem('SalesService_sales', JSON.stringify(this.sales));
    } else {
    	// every other time
    	this.sales = JSON.parse(localStorage.getItem('SalesService_sales'));
    }
  }
]);
