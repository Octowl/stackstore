app.config(function($stateProvider){
 $stateProvider.state('myProfile', {
        //url: '/:id',
        url: '/profile/:id',
        templateUrl: 'js/profile/profile.html',
        controller: 'User',
        resolve: {
        	user: function($stateParams, UserFactory){
        		console.log($stateParams.id);
        		return UserFactory.getUser($stateParams.id)
        	}
        }
    });
})

app.controller('User', function($scope, user){
	console.log(user)
	$scope.user = user;
	//console.log($scope.user);
})