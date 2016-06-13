app.controller('ProductDetailsCrtl', function($scope, productForDetails, ProductFactory, userForDetails, loggedInUser, ReviewFactory){
    $scope.productForDetails = productForDetails;
    $scope.userForDetails = userForDetails;
    $scope.loggedInUser = loggedInUser;

	$scope.getNumber = function(num) {
	    return new Array(num);   
	}

	$scope.inStock = function(n){
		if(n > 0) return true;
		else return false;
	}

	$scope.getStars = function(arr){
		var sum = 0;
		arr.forEach(function(item){
			sum += item.stars
		})
		return Math.round((sum/arr.length)*10)/10;
	}

	$scope.submitReview = function(review){
		console.log('made it to controller')
		ReviewFactory.submitReview(review)
	}

	$scope.addToCart = ProductFactory.addToCart;
});