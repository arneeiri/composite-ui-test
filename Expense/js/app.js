var expense = angular.module('expense', ['ui.router']);
expense.config(function($stateProvider) {
    $stateProvider.state('home.registerexpense',
        {
            url: 'registerexpense',
            templateUrl: 'http://expense.localtest.me:3000/expense/partials/registerexpense.html'
        }
    );
});

expense.service("ActionProvider", function() {
    this.getAction = function() {
        return {state: "home.registerexpense", title: "Register expense"};
    };
});