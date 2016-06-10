app.controller('ProductListCrtl', function($scope, products, ProductFactory){
    $scope.products = products;

    $scope.addToCart = ProductFactory.addToCart;

});
