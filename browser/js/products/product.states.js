app.config(function ($stateProvider) {
    $stateProvider.state('grid', {
    	url : '/grid',
    	templateUrl : 'js/products/productGrid.html',
    	controller : 'ProductListCrtl',
        resolve: {
            products: function(Product) {
                return Product.getAll();
            }
        }
    })
});
