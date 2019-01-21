angular.module("EmployeModule", []).config(function ($routeProvider) {
    $routeProvider.when('/employe/detailAgent/:id', {
        templateUrl: 'drh/employe/detailAgent.html',
        controller: 'DetailEmployeController'
        
    }).when('/employe/demandes/absence', {
        templateUrl: 'employe/demandes/absence.html',
        controller: 'AbsenceController'
        
    }).when('/employe/demandes/detailAbsence/:id', {
        templateUrl: 'service/demandes/detailAbsence.html',
        controller: 'DetailAbsenceController'
        
    }).when('/employe/demandes/historique', {
        templateUrl: 'service/demandes/consulterAbsence.html',
        controller: 'ConsulterAbsenceEmployeController'
   
    }).otherwise('/');

});
