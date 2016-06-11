app.controller('ProductListCtrl', function ($scope, products, ProductFactory) {
    $scope.products = products;

    $scope.addToCart = ProductFactory.addToCart;

    $scope.checkProductName = function (searchValue, product) {
        if (!searchValue) return true;
        searchValue = searchValue.toLowerCase();
        var newname = product.name.toLowerCase();
        var location = product.location.name.toLowerCase();
        return (newname.indexOf(searchValue) !== -1 || location.indexOf(searchValue) !== -1);
    };

});
