angular.module("EmployeModule",[]).config(function ($routeProvider){
    $routeProvider.when('/employe/detailAgent/:id',{
        templateUrl: 'drh/employe/detailAgent.html',
        controller: 'DetailEmployeController'
    }).when('/employe/demandes/absence',{
        templateUrl:'employe/demandes/absence.html',
        controller:'AbsenceController'
    }).when('/employe/demandes/conge',{
        templateUrl:'employe/demandes/conge.html',
        controller:'CongeController'
    }).otherwise('/');
    
});
