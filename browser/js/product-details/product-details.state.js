app.config(function ($stateProvider) {
    $stateProvider.state('productDetails', {
        url : '/:id/user/:userId',
        templateUrl : 'js/product-details/product-details.html',
        controller: 'ProductDetailsCrtl',
        resolve: {
          productForDetails: function (ProductFactory, $stateParams) {
            return ProductFactory.getOne($stateParams.id)
          },
          userForDetails: function(UserFactory, $stateParams) {
            return UserFactory.getUser($stateParams.userId)
          }
        }
    });
});