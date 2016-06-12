app.config(function ($stateProvider) {
    $stateProvider.state('productDetails', {
        url : '/:id',
        templateUrl : 'js/product-details/product-details.html',
        controller: 'ProductDetailsCrtl',
        resolve: {
          productForDetails: function (ProductFactory, $stateParams) {
            return ProductFactory.getOne($stateParams.id)
          }
        }
    });
});