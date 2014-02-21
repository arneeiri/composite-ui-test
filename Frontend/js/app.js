var frontend = angular.module('frontend', ['ui.router', 'trip', 'expense']);

frontend.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider.state('home',
        {
            url: "/",
            templateUrl: "partials/home.html",
            controller: "HomeCtrl"
        });
});

frontend.controller("HomeCtrl", function($scope, ActionsProvider) {
    $scope.actions = ActionsProvider.getActions();
});


frontend.service("ActionsProvider", function(ServiceLocator) {
    this.getActions = function() {
        var actions = [];
        var actionProviders = ServiceLocator.resolve("ActionProvider");
        for (var i = 0; i < actionProviders.length; i++) {
            var actionProvider = actionProviders[i];
            actions.push(actionProvider.getAction());
        }
        return actions;
    }
});

frontend.service("ServiceLocator", function() {
    this.resolve = function(serviceName) {
        var services = [];
        for (var i = 0; i < frontend.requires.length; i++) {
            var module = frontend.requires[i];
            var injector = angular.injector([module]);
            if (injector.has(serviceName)) {
                var service = injector.get(serviceName);
                services.push(service);
            }
        }
        return services;
    }
});