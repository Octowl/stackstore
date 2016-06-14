app.factory('LocationFactory', function ($http) {
    var LocationFactory = {};

    function resToData(res) {
        return res.data;
    }

    LocationFactory.getAll = function() {
        return $http.get('/api/locations/')
        .then(resToData);
    }

    return LocationFactory;
});
