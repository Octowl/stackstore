app.factory('OrderFactory', function($http){
	return {
		getCart: function(){
			return $http.get('/api/orders/cart')
		},
		checkout: function(){
			return $http.get('/api/orders/checkout');
		},
		removeFromCart: function(itemProductId){
			return $http.get('/api/products/' + Number(itemProductId) + '/removeFromCart');
		}
	}
})