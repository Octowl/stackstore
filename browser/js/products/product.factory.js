app.factory('Product', function ($http) {
    var ProductFactory = {};

    function resToData(res) {
        return res.data;
    }

    ProductFactory.getAll = function() {
        return $http.get('/api/products')
        .then(resToData);
    };

    return ProductFactory;
});
