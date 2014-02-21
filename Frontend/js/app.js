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
