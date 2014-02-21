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

trip.controller('RegisterTripCtrl', function($scope, $http) {
    $scope.registerTrip = function() {
        $http.post('http://trip.localtest.me:3000/trip/trip', $scope.trip).success(function()
            {
                alert('hey');
            }
        );
    }
});