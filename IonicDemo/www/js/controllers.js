angular.module('starter.controllers', [])

.controller('searchOrderCtrl', function($scope,$http,orders,$location) {
	$scope.ordersList = [];
	$scope.stat = { "status":""};
	$scope.getOrder = function(){
		orders.getOrders($scope.stat.status).success(function(data, status) {
			$scope.ordersList = data;
		});
	}	
})
.controller('orderDetailCtrl', function($scope, $stateParams, orders) {
    $scope.prod = {};
	orders.getProduct($stateParams).success(function(data, status) {
		$scope.prod = data;
	});
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('orderCtrl', function($scope,$state,$http) {
  $scope.orderlist = { "consumerId":0 ,"externalRef":"","productName": "","posId": 0,"locationName": "","quantity": 0,"uom": "","amount": 0};
  
	$scope.orders = [];
	$scope.saveOrder = function(){
	    var orderData = $scope.orderlist;
		$scope.orderlist = { "consumerId":0 ,"externalRef":"","productName": "","posId": 0,"locationName": "","quantity": 0,"uom": "","amount": 0};
		var req = {
			method: 'POST',
			url: "http://localhost:9060/api/order",
			data:orderData
		}
		$http(req).success(function(res) {
			console.log(res.data);
		}).error(function(err){
			console.error(err)
		});
	}
});
