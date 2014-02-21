var trip = angular.module('trip', ['ui.router']);
trip.config(function($stateProvider) {
    $stateProvider.state('home.registertrip', {url: 'registertrip', templateUrl: 'partials/registertrip.html'});
});

trip.service("ActionProvider", function() {
    this.getAction = function() {
        return {state: "home.registertrip", title: "Register trip"};
    };
});

var expense = angular.module('expense', ['ui.router']);
expense.config(function($stateProvider) {
    $stateProvider.state('home.registerexpense', {url: 'registerexpense', templateUrl: 'partials/registerexpense.html'});
});


expense.service("ActionProvider", function() {
    this.getAction = function() {
        return {state: "home.registerexpense", title: "Register expense"};
    };
});

var frontend = angular.module('frontend', ['ui.router', 'trip', 'expense']);

frontend.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider.state('home', { url: "/", templateUrl: "partials/home.html", controller: "HomeCtrl" });
});

frontend.controller("HomeCtrl", function($scope, ActionsProvider) {
    $scope.actions = ActionsProvider.getActions();
});

frontend.service("ActionsProvider", function() {
    this.getActions = function() {
        var actions = [];
        for (var i = 0; i < frontend.requires.length; i++) {
            var module = frontend.requires[i];
            var injector = angular.injector([module]);
            if (injector.has('ActionProvider')) {
                var actionProvider = injector.get('ActionProvider');
                actions.push(actionProvider.getAction());
            }
        }
        return actions;
    }
});
