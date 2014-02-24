var expense = angular.module('expense', ['ui.router']);
expense.config(function($stateProvider) {
    $stateProvider.state('home.registerexpense',
        {
            controller: "RegisterExpenseCtrl",
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

expense.service("ItemProvider", function() {
    this.getItems = function($http, callback) {
        $http.get('http://expense.localtest.me:3000/expense/expense').success(function(data){
            for (var i = 0; i < data.length; i++) {
                var expense = data[i];
                expense.description = expense.date + ": " + expense.total + " NOK for " + expense.specification + ".";
            }
            callback(data);
        });
    };
})

expense.controller('RegisterExpenseCtrl', function($scope, $http) {
    $scope.registerExpense = function() {
        $http.post('http://expense.localtest.me:3000/expense/expense', $scope.expense);
    }
});