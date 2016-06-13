app.factory('ProfileFactory', function($http){
	var ProfileFactory = {};
	
	function resToData (res){
		return res.data;
	}

	ProfileFactory.updateUser = function(id, data){
		return $http.put('/api/users/' + id, data)
		.then(resToData)
	}

	return ProfileFactory
})