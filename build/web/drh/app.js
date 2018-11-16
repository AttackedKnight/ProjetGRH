/*
 * Module DRH 
 * */

angular.module("DrhModule", ['ngRoute', 'ngMessages']).config(function ($routeProvider) {
    $routeProvider.when('/drh/employe/ajout/type/:type', {
        templateUrl: 'drh/employe/ajouterAgent.html',
        controller: 'EmployeController'
        
    }).when('/drh/entite', {
        templateUrl: 'drh/entite/detailentite.html',
        controller: 'DrhDetailEntiteController'
        
    }).when('/drh/employe/consulter', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeController'
        
    }).when('/drh/employe/consulter/type/:type', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeController'

    }).when('/drh/employe/consulter/genre/:genre/type/:type', {     //ok
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeController'

    }).when('/drh/employe/consulter/homme', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeHommeController'

    }).when('/drh/employe/consulter/homme/type/:type', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeHommeController'

    }).when('/drh/employe/consulter/femme', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeFemmeController'

    }).when('/drh/employe/consulter/femme/type/:type', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeFemmeController'

    }).when('/drh/entite/consulter/:id', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeEntiteController'

    }).when('/drh/entite/consulter/:id/type/:type', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeEntiteController'

    }).when('/drh/entite/consulter/:id/genre/:genre/type/:type', {  //ok
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeEntiteController'

    }).when('/drh/entite/consulter/:id/homme/type/:type', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeHommeEntiteController'

    }).when('/drh/entite/consulter/:id/homme', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeHommeEntiteController'

    }).when('/drh/entite/consulter/:id/femme/type/:type', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeFemmeEntiteController'

    }).when('/drh/entite/consulter/:id/femme', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeFemmeEntiteController'

    }).when('/drh/employe/detailAgent/:id', {
        templateUrl: 'drh/employe/detailAgent.html',
        controller: 'DetailEmployeController'
        
    }).when('/drh/demandes/absence', {
        templateUrl: 'drh/demandes/listeAbsence.html',
        controller: 'ListeAbsenceController'
        
    }).when('/drh/demandes/conge', {
        templateUrl: 'drh/demandes/listeConge.html',
        controller: 'ListeCongeController'
        
    }).when('/drh/demandes/detailConge', {
        templateUrl: 'drh/demandes/detailConge.html',
        controller: 'DetailCongeController'
        
    }).when('/drh/demandes/detailAbsence', {
        templateUrl: 'drh/demandes/detailAbsence.html',
        controller: 'DetailAbsenceController'
        
    }).otherwise('/');
});
