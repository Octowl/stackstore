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

    ReviewFactory.submitReview = function(review){
        return $http.post('api/reviews', review)
        .then(resToData)
    }
    
    return ReviewFactory;
});
