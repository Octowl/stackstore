app.config(function($stateProvider){
 $stateProvider.state('myProfile', {
        url: '/profile/:id',
        templateUrl: 'js/profile/profile.html',
        controller: 'User',
        resolve: {
        	user: function($stateParams, UserFactory){
        		return UserFactory.getUser($stateParams.id)
        	},
            reviews: function(ReviewFactory, $stateParams){
                return ReviewFactory.getAllUserReviews($stateParams.id)
            }
        }
    });
})

