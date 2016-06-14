app.factory('UserFactory', function($http){
	return {
		getUser: function(id){
			return $http.get('/api/users/user/' + id)
			.then(function(res){
				return res.data;
			}); 
		},
		getAll: function(){
			return $http.get('/api/users')
			.then(function(res){
				return res.data;
			})
		},

		deleteUser: function(id){
			console.log(id);
			return $http.delete('/api/users/' + id)
			.then(function(res){
				return res.data;
			})
		}
	}
})