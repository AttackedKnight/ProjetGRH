/*
 * Module gerant la partie Entite : vue de chef d'entite
 * */

angular.module("ServiceModule", ['ngRoute', 'ngMessages']).config(function ($routeProvider) {
    $routeProvider.when('/service/:id', {
        templateUrl: 'service/entite/detailentite.html',
        controller: 'ServiceDetailEntiteController'
        
    }).when('/service/consulter/:id', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeEntiteController'

    }).when('/service/demandes/detailAbsence/:id', {
        templateUrl: 'service/demandes/detailAbsence.html',
        controller: 'DetailAbsenceController'
        
    }).when('/service/demandes/consulterAbsence', {
        templateUrl: 'service/demandes/consulterAbsence.html',
        controller: 'ConsulterAbsenceController'
        
    }).otherwise('/');
});


