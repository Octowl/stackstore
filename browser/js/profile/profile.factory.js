app.factory('ProfileFactory', function($http){
	var ProfileFactory = {};
	
	function resToData (res){
		console.log('made it to factory')
		return res.data;
	}

	ProfileFactory.updateUser = function(id, data){
		console.log(id, data)
		return $http.put('/api/users/' + id, data)
		.then(resToData);
	}

	return ProfileFactory
})