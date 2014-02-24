var trip = angular.module('trip', ['ui.router']);
trip.config(function($stateProvider) {
    $stateProvider.state('home.registertrip',
        {
            url: 'registertrip',
            templateUrl: 'http://trip.localtest.me:3000/trip/partials/registertrip.html',
            controller: 'RegisterTripCtrl'
        }
    );
});

trip.service("ActionProvider", function() {
    this.getAction = function() {
        return {state: "home.registertrip", title: "Register trip"};
    };
});

trip.service("ItemProvider", function() {
    this.getItems = function($http, callback) {
        $http.get('http://trip.localtest.me:3000/trip/trip').success(function(data){
            for (var i = 0; i < data.length; i++) {
                var trip = data[i];
                trip.description = "Trip to " + trip.destination + " for " + trip.length + " days";
            }
            callback(data);
        });
    };
})

trip.controller('RegisterTripCtrl', function($scope, $http) {
    $scope.registerTrip = function() {
        $http.post('http://trip.localtest.me:3000/trip/trip', $scope.trip);
    }
});