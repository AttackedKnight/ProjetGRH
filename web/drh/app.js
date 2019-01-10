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

    }).when('/drh/entite/consulter/:id', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeEntiteController'

    }).when('/drh/entite/consulter/:id/type/:type', {
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeEntiteController'

    }).when('/drh/entite/consulter/:id/genre/:genre/type/:type', {  //ok
        templateUrl: 'drh/employe/consulterAgent.html',
        controller: 'ConsulterEmployeEntiteController'

    }).when('/drh/employe/detailAgent/:id', {
        templateUrl: 'drh/employe/detailAgent.html',
        controller: 'DetailEmployeController'
        
    }).otherwise('/');
});
