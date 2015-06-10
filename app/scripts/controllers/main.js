'use strict';

/**
 * @ngdoc function
 * @name catReceiptApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the catReceiptApp
 */
angular.module('catReceiptApp')
  .controller('MainCtrl', [

  	'$scope', 'ItemService', 'SalesService', 'BundleService', '$interval', '$timeout',
  	function ($scope, ItemService, SalesService, BundleService, $interval, $timeout) {

      var item_remove_timeout,
          bundle_remove_timeout;

  	$scope.date = (new Date()).getTime();


  	$scope.item_create = {
  		visible: false,
  		name: '',
  		cost: '',
  		owner: 0,
      stock: 0
  	};

  	$scope.bundle_create = {
  		visible: false,
  		name: '',
  		cost: '',
  		owner: 2
  	};

    $scope.export_create = {
      visible: false,
      content: 'I am on a horse.'
    };

  	$interval(function(){
  		$scope.date = (new Date()).getTime();
  	}, 1000);

    $scope.items = ItemService.items;

    $scope.bundles = BundleService.bundles;

    $scope.sales = SalesService.sales;

    $scope.cart = [];
    $scope.total = 0;

    function tryRemoveItem(item, $index) {
      if(confirm('Are you sure you want to delete ' + item.name + '?')) {
          if(item.bundle) {
            $scope.bundles.splice($index, 1);
            BundleService.flush();
          } else {
            $scope.items.splice($index, 1);
            ItemService.flush();
          }
        }
    }

    $scope.addToCart = function($event, item, $index){
    	if($event.altKey) {
    		tryRemoveItem(item, $index);
    	} else {
	    	var time = (new Date()).getTime(),
	    	instance = {
	    		name: item.name,
	    		cost: item.cost,
	    		time: time
	    	};

	    	$scope.total += parseFloat(item.cost);

	    	$scope.cart.push(instance);
	    }
    };

    $scope.removeFromCart = function(index){
    	$scope.cart.splice(index, 1);
    	$scope.total = 0;
    	for(var i = 0; i < $scope.cart.length; i++) {
    		var item = $scope.cart[i];
    		$scope.total += parseFloat(item.cost);
    		if(item.is_bundle){
    			$scope.total = parseFloat(item.cost);
    		}
    	}
    };

    $scope.purchase = function(is_cash){
    	if(confirm('Customer pays $' + parseFloat($scope.total).toFixed(2) + (is_cash ? ' in CASH?' : ' on CARD?'))) {
        var cart_item,
            list_item;
        for(var i = 0; i < $scope.cart.length; i++) {
          cart_item = $scope.cart[i];
          for(var j = 0; j < $scope.items.length; j++) {
            list_item = $scope.items[j];
            if(cart_item.name === list_item.name && !list_item.bundle) {
              list_item.stock--;
              j = $scope.items.length;
            }
          }
        }

        ItemService.flush();
	    	SalesService.addSale($scope.cart, $scope.total, is_cash);
	    	$scope.cart = [];
	    	$scope.total = 0;
    	}
    };

    $scope.toggleCreateItem = function() {
    	$scope.item_create.visible = !$scope.item_create.visible;
    };

    $scope.beginRemoveItem = function(item, $index) {
      item_remove_timeout = $timeout(function(){
        tryRemoveItem(item, $index);
      }, 3000);
    };

    $scope.endRemoveItem = function() {
      $timeout.cancel(item_remove_timeout);
    };

    $scope.beginRemoveBundle = function(bundle, $index) {
      bundle_remove_timeout = $timeout(function(){
        tryRemoveItem(bundle, $index);
      }, 3000);
    };

    $scope.endRemoveBundle = function() {
      $timeout.cancel(bundle_remove_timeout);
    };

    $scope.toggleCreateBundle = function() {
      $scope.bundle_create.visible = !$scope.bundle_create.visible;
    };

    $scope.toggleCreateExport = function() {
    	$scope.export_create.visible = !$scope.export_create.visible;
      var output = '',
          item,
          bundle,
          sale,
          cart_item;
      if ($scope.export_create.visible) {
        output += 'items\n';
        output += 'name\tcost\towner\tstock\n';
        for(var i = 0; i < $scope.items.length; i++) {
          item = $scope.items[i];
          output += [item.name,item.cost,item.owner,item.stock].join('\t') + '\n';
        }


        output += '\nbundles\n';
        output += 'name\tcost\towner\n';
        for(var i = 0; i < $scope.bundles.length; i++) {
          bundle = $scope.bundles[i];
          output += [bundle.name,bundle.cost,bundle.owner].join('\t') + '\n';
        }

        output += '\nsales\n';
        output += 'sale_id\ttotal\ttime\tcash\n';
        var lookup = '\ncart_contents\nsale_id\tname\tcost\n';
        for(var i = 0; i < $scope.sales.length; i++) {
          sale = $scope.sales[i];
          output += [i,sale.total,sale.time,sale.cash].join('\t') + '\n';
          for(var j = 0; j < sale.cart.length; j++) {
            cart_item = sale.cart[j];
            lookup += [i,cart_item.name,cart_item.cost].join('\t') + '\n';
          }
        }

        output += lookup;
      }

      $scope.export_create.content = output;
    };

    $scope.createItem = function(continue_create) {
    	ItemService.addItem($scope.item_create.name, $scope.item_create.cost, $scope.item_create.owner, $scope.item_create.stock);
    	$scope.item_create.name = '';
      $scope.item_create.stock = 0;
    	$scope.item_create.visible = continue_create;
    };

    $scope.createBundle = function(continue_create) {
    	BundleService.addBundle($scope.bundle_create.name, $scope.bundle_create.cost, $scope.bundle_create.owner);
    	$scope.bundle_create.name = '';
    	$scope.bundle_create.visible = continue_create;
    };

    $scope.nukeItems = function(){
    	if(confirm('Are you sure you want to empty all items?')) {
    		ItemService.nukeItems();
    	}
    };

    $scope.nukeBundles = function(){
    	if(confirm('Are you sure you want to clear all bundle records?')) {
    		BundleService.nukeBundles();
    	}
    };

    $scope.nukeSales = function(){
    	if(confirm('Are you sure you want to clear all sales records?')) {
    		SalesService.nukeSales();
    	}
    };
  }
  ]);
