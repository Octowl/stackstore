app.controller('User', function($scope, user, reviews, loggedInUser, ProfileFactory, orders){

	$scope.stars= new Array(5);
	$scope.user = user;
	$scope.reviews = reviews;
	$scope.orders = orders;

	$scope.confirmation = false;

	$scope.getStars = function(arr){
		var sum = 0;
		arr.forEach(function(item){
			sum += item.stars
		})
		return Math.round((sum/arr.length)*10)/10;
	}

	$scope.loggedInUser = loggedInUser;

	$scope.loggedInFilter = function(loggedInUser,userOfPage) {
		return loggedInUser.id === userOfPage.id || loggedInUser.isAdmin ===true
	}

	$scope.updateUserInfo = function(id,data){
		ProfileFactory.updateUser(id, data).
		then(function(){
			$scope.confirmation = true;
		})
	}
})

