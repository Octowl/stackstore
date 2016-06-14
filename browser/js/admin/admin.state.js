app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        // controller: 'AdminCtrl',
        // resolve: {
        //     products: function (ProductFactory) {
        //         return ProductFactory.getAll();
        //     },
        //     locations: function(LocationFactory) {
        //         return LocationFactory.getAll();
        //     },
        //     orders: function(OrderFactory){
        //         return OrderFactory.getAll();
        //     },
        //     users: function(UserFactory){
        //         return UserFactory.getAll();
        //     }
        // }
    });
}); 