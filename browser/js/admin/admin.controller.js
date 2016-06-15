app.controller('AdminCtrl', function($scope, AdminFactory, locations, UserFactory, users){
    
    // $scope.orders = orders;

    // $scope.users = users;

    $scope.createProduct = AdminFactory.createProduct;

    $scope.locations = locations;

    $scope.users = users;

    $scope.deleteUser = UserFactory.deleteUser;

    $scope.adminUser = UserFactory.adminUser;

});