app.factory('ProductFactory', function ($http) {
    var ProductFactory = {};

    function resToData(res) {
        return res.data;
    }

    ProductFactory.getAll = function() {
        return $http.get('/api/products')
        .then(resToData);
    };

    ProductFactory.addToCart = function(id) {
    	return $http.get('/api/products/' + id + '/addToCart')
    	.then(resToData);
    }

    return ProductFactory;
});
