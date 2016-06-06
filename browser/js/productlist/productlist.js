app.config(function ($stateProvider) {
    $stateProvider.state('productlist', {
        url: '/',
        templateUrl: 'js/productlist/productlist.html'
    })

    .state('productlist.grid', {
    	url : '/grid',
    	templateUrl : 'js/productlist/productlistGrid.html',
    	controller : function($scope) {
    		$scope.item = ['cigarets', 'showergel', 'perfume', 'panadol']
    	}
    })
});







