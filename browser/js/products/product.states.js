app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url : '/products',
        templateUrl : 'js/products/products.html',
        controller : 'ProductListCrtl',
        resolve: {
            products: function(ProductFactory) {
                return ProductFactory.getAll();
            }
        }
    });

    $stateProvider.state('products.grid', {
        url : '/grid',
        templateUrl : 'js/products/productGrid.html',
    });

});
