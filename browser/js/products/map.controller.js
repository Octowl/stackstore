app.controller('MapCtrl', function ($scope) {

        var coveMarkers = {};

        $scope.products.forEach(function(product){
            coveMarkers[product.location.name] = {lat: product.location.latitude, lng: product.location.longitude, message: product.name, focus: false, draggable: false}
        })
    
        angular.extend($scope, {
            osloCenter: {
                lat: 0,
                lng: 0,
                zoom: 2
            },
            markers: coveMarkers,
            layers: {
                baselayers: {
                    osm: {
                        name: 'OpenStreetMap',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        type: 'xyz'
                    },
                    mapbox_light: {
                        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
                        options: {
                            apikey: 'pk.eyJ1IjoiY2FkaWxsYWMiLCJhIjoiY2lwYWg1d2NuMDAzbnRsbmozN3gxbGI5eiJ9.NfnE3Rw-ahS2snpQkQmtmw',
                            mapid: 'cadillac.0c9anhd3'
                        }
                    }
                }
            },
            defaults: {
                scrollWheelZoom: false
            }
        });

})