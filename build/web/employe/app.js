angular.module("EmployeModule", []).config(function ($routeProvider) {
    $routeProvider.when('/employe/detailAgent/:id', {
        templateUrl: 'drh/employe/detailAgent.html',
        controller: 'DetailEmployeController'
        
    }).when('/employe/demandes/absence', {
        templateUrl: 'employe/demandes/absence.html',
        controller: 'AbsenceController'
        
    }).when('/employe/demandes/historique', {
        templateUrl: 'employe/demandes/consulterAbsence.html',
        controller: 'ConsulterAbsenceController'
   
    }).otherwise('/');

});
