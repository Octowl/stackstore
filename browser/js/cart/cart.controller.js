app.controller('CartCtrl', function($scope, order){
	$scope.order = order;
	$scope.getTotal = function() {
		return $scope.order.orderItems.reduce(function(count, item){
			return count += item.product.price * item.quantity;
		}, 0)
	}
})