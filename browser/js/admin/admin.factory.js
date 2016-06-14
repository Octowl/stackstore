app.factory('AdminFactory', function ($http) {
    var AdminFactory = {};

    function resToData(res) {
        return res.data;
    }

    AdminFactory.createProduct = function(data) {
        console.log(data);
        return $http.post('/api/products', data)
        .then(resToData);
    }

    return AdminFactory;
});
