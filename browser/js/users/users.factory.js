app.factory('UserFactory', function($http){
	return {
		getUser: function(id){
			return $http.get('api/users/' + id)
			.then(function(res){
				return res.data;
			}); 
		}
	}
})