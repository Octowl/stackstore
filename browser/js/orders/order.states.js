app.config(function ($stateProvider) {
    $stateProvider.state('orderDetail', {
        url: '/order/:id',
        templateUrl: 'js/orders/order.html',
        controller: 'CartCtrl',
        resolve: {
            order: function (OrderFactory, $stateParams) {
                return OrderFactory.getOrder($stateParams.id);
            }

        }
    });
});
