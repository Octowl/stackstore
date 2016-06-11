app.factory('OrderFactory', function ($http) {
    var OrderFactory = {};

    function resToData(res) {
        return res.data;
    }

    OrderFactory.getAllUserOrders = function(id) {
        return $http.get('/api/users/' + id + '/orders')
        .then(resToData);
    };

    return OrderFactory;
});
