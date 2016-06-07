app.config(function ($stateProvider) {
    $stateProvider.state('grid', {
    	url : '/grid',
    	templateUrl : 'js/productlist/productlistGrid.html',
    	controller : function($scope) {
    		$scope.products = ['cigarets', 'showergel', 'perfume', 'panadol']
    	}
    })
});
