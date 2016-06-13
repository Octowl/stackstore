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
		}
	}
})