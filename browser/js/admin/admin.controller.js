app.controller('AdminCtrl', function($scope, AdminFactory, locations, UserFactory, users, orders){
    
    $scope.orders = orders;

    $scope.createProduct = AdminFactory.createProduct;

    $scope.locations = locations;

    $scope.users = users;

    $scope.deleteUser = UserFactory.deleteUser;

    $scope.adminUser = UserFactory.adminUser;

});