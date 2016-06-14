app.config(function($stateProvider){
 $stateProvider.state('cart', {
        url: '/myCart',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl',
        resolve: {
            order: function(OrderFactory){
                return OrderFactory.getCart();
            }
        }
    })
})