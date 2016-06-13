app.factory('OrderFactory', function ($http) {
	
	function resToData(res) {
        return res.data;
    }

	return {
		getCart: function(){
			return $http.get('/cart')
			.then(resToData);
		},
		getOrder: function(id){
			return $http.get('api/orders/' + id).then(resToData);
		},
		getAllOrders: function(){
			return $http.get('api/orders').then(resToData);
		},
		deleteProductFromCart: function(cartId, productId){
			return $http.delete('api/orders/' + cartId + '/products/' + productId)
			.then(resToData);
		},
		changeItemQuantity: function(itemId, quantity){
			return $http.put('api/orderitems/' + itemId, {quantity: quantity})
			.then(resToData);
		},
		checkout: function(){
			return $http.get('api/orders/checkout').then(resToData);
		}
	}
})