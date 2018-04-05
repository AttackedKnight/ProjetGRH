angular.module("EmployeModule",[]).config(function ($routeProvider){
    $routeProvider.when('/employe/detailAgent/:id',{
        templateUrl: 'drh/employe/detailAgent.html',
        controller: 'DetailEmployeController'
    }).otherwise('/');
    
});
