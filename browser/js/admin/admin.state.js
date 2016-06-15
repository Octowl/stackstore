app.config(function ($stateProvider) {
    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/admin/admin.html',
        controller: 'AdminCtrl',
        resolve: {
            locations: function(LocationFactory) {
                return LocationFactory.getAll();
            },
            orders: function(OrderFactory){
                return OrderFactory.getAllOrders();
            }
        }
    });
}); 