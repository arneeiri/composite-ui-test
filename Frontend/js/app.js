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

frontend.controller("HomeCtrl", function($scope, ActionsProvider, ItemsProvider, $http) {
    $scope.actions = ActionsProvider.getActions();

    var getItems = function () {
        ItemsProvider.getItems($http, function (items) {
            $scope.items = items;
        });
    }
    getItems();

    $scope.$on('itemadded', function() {
        getItems();
    })
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

frontend.service("ItemsProvider", function(ServiceLocator) {
    this.getItems = function($http, callback) {

        var itemProviders = ServiceLocator.resolve("ItemProvider");
        var functionArray = [];
        var addWork = function(itemProvider) {
            functionArray.push(function(callback) {
                itemProvider.getItems($http, function(items) {
                    callback(null, items);
                });
            });
        };
        for (var i = 0; i < itemProviders.length; i++) {
            var itemProvider = itemProviders[i];
            addWork(itemProvider);
        }
        async.parallel(functionArray, function(err, results) {
            var merged = [];
            merged = merged.concat.apply(merged, results);
            callback(merged);
        });
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