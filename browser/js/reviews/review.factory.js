app.factory('ReviewFactory', function ($http) {
    var ReviewFactory = {};

    function resToData(res) {
        return res.data;
    }

    ReviewFactory.getAllUserReviews = function(id) {
        return $http.get('/api/users/' + id + '/reviews')
        .then(resToData);
    };

    ReviewFactory.getAllProductReviews = function(id) {
        return $http.get('/api/products/' + id + '/reviews')
        .then(resToData);
    };
    
    return ReviewFactory;
});
