app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductListCtrl',
        resolve: {
            products: function (ProductFactory) {
                return ProductFactory.getAll();
            },

        }
    });

    $stateProvider.state('products.grid', {
        url : '/grid',
        templateUrl : 'js/products/productGrid.html'
    });

    $stateProvider.state('products.map', {
        url : '/map',
        controller: 'MapCtrl',
        templateUrl : 'js/products/productMap.html'
    });

});
