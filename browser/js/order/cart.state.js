app.config(function($stateProvider){
 $stateProvider.state('cart', {
        url: '/cart',
        templateUrl: 'js/order/order.html',
        controller: 'Cart',
        resolve: {
            OrderItems: function($http){
                return $http.get('/api/orders/cart');
            }
            //all of the OrderItems. 
            //Also need the product from that OrderItem

            
        	// user: function($stateParams, UserFactory){
        	// 	return UserFactory.getUser($stateParams.id)
        	// },
         //    reviews: function(ReviewFactory, $stateParams){
         //        return ReviewFactory.getAllUserReviews($stateParams.id)
         //    }
        }
    });
})