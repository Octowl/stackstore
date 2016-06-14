app.controller('CartCtrl', function($scope, $state, order, OrderFactory){
	$scope.order = order;
	$scope.getTotal = function() {
		return $scope.order.orderItems.reduce(function(count, item){
			return count += item.product.price * item.quantity;
		}, 0)
	}
	$scope.checkout = function() {
		OrderFactory.checkout().then(function(){
			$state.go('home');
		});
	}
	$scope.removeItem = function(id) {
		console.log('Made it to the cart controller');
		OrderFactory.deleteProductFromCart(order.id, id)
		.then(function(){
			return OrderFactory.getCart()
		})
		.then(function(updatedCart){
			$scope.order = updatedCart;
		})
	}
	$scope.updateQuantity = function(item) {
		OrderFactory.changeItemQuantity(item.id, item.quantity)
	}
})