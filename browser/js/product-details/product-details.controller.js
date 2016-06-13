app.controller('ProductDetailsCrtl', function($scope, productForDetails, ProductFactory, userForDetails){
    $scope.productForDetails = productForDetails;
    $scope.userForDetails = userForDetails;

	$scope.getNumber = function(num) {
	    return new Array(num);   
	}

	$scope.inStock = function(n){
		if(n > 0) return true;
		else return false;
	}

	$scope.addToCart = ProductFactory.addToCart;
});