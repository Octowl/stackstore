app.directive('order', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/orders/order.html',
        scope: {
            order: '=',
            isCart: '@'
        },
        link: function (scope, element, attrs) {
            if (scope.isCart) {
                scope.order.orderItems.forEach(function (item) {
                    item.price = item.product.price;
                });
            }
        }
    }
})
