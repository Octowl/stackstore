// app.directive('orderItem', function() {
// 	restrict: 'E',
//     templateUrl: '/browser/js/order/order.html',
//     scope: {
//       item: '=model',
//       iconClick: '&',
//       afterRemove: '&'
//     },
//       link: function (scope, elem, attr){

//       }
// })

app.directive('orderItem', function(){
  return {
    restrict : 'E',
    templateUrl: 'js/order/orderitem.html'
  }
})