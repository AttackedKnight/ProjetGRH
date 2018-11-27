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

    }).when('/service/demandes/absence', {
        templateUrl: 'drh/demandes/listeAbsence.html',
        controller: 'ListeAbsenceController'
        
    }).when('/service/demandes/conge', {
        templateUrl: 'drh/demandes/listeConge.html',
        controller: 'ListeCongeController'
        
    }).when('/service/demandes/detailConge', {
        templateUrl: 'drh/demandes/detailConge.html',
        controller: 'DetailCongeController'
        
    }).when('/service/demandes/detailAbsence/:id', {
        templateUrl: 'service/demandes/detailAbsence.html',
        controller: 'DetailAbsenceController'
        
    }).when('/service/demandes/consulterAbsence', {
        templateUrl: 'service/demandes/consulterAbsence.html',
        controller: 'ConsulterAbsenceController'
        
    }).otherwise('/');
});


