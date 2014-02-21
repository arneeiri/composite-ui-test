var trip = angular.module('trip', ['ui.router']);
trip.config(function($stateProvider) {
    $stateProvider.state('home.registertrip', {url: 'registertrip', templateUrl: 'http://trip.localtest.me/trip/partials/registertrip.html'});
});

trip.service("ActionProvider", function() {
    this.getAction = function() {
        return {state: "home.registertrip", title: "Register trip"};
    };
});