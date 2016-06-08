app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url : '/products',
        templateUrl : 'js/products/products.html',
        controller : 'ProductListCrtl',
        resolve: {
            products: function(Product) {
                return Product.getAll();
            }
        }
    });

    $stateProvider.state('products.grid', {
        url : '/grid',
        templateUrl : 'js/products/productGrid.html',
        // controller : 'ProductListCrtl',
        // resolve: {
        //     products: function(Product) {
        //         return Product.getAll();
        //     }
        // }
    });

});
