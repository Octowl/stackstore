app.controller('User', function($scope, user, reviews, orders){
	$scope.stars= new Array(5);

	$scope.user = user;
	$scope.reviews = reviews;
	$scope.orders = orders;

	console.log("ORDERS", orders);
});

// app.controller('AccordionDemoCtrl', function ($scope) {
//   $scope.oneAtATime = true;

//   $scope.groups = [
//     {
//       title: 'Dynamic Group Header - 1',
//       content: 'Dynamic Group Body - 1'
//     },
//     {
//       title: 'Dynamic Group Header - 2',
//       content: 'Dynamic Group Body - 2'
//     }
//   ];

//   $scope.items = ['Item 1', 'Item 2', 'Item 3'];

//   $scope.addItem = function() {
//     var newItemNo = $scope.items.length + 1;
//     $scope.items.push('Item ' + newItemNo);
//   };

//   $scope.status = {
//     isCustomHeaderOpen: false,
//     isFirstOpen: true,
//     isFirstDisabled: false
//   };
// }); //Maybe we'll use this ?
