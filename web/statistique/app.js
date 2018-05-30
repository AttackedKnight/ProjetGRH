/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*Utiliser une meme page, des routes differentes,appeler different controlleurs*/
angular.module('StatistiqueModule',['ngRoute','ngMessages'])
.config(function ($routeProvider){
    $routeProvider.when('/drh',{
        templateUrl:'statistique/statistique-drh.html',
        controller: 'StatistiqueDRHController'
    }).when('/drh/e',{
        templateUrl:'statistique/statistique-drh-entite.html',
        controller: 'StatistiqueDRHEntiteController'
    }).when('/drh/per',{
        templateUrl:'statistique/statistique-drh.html',
        controller: 'StatistiquePERController'
    }).when('/drh/per/e',{
        templateUrl:'statistique/statistique-drh-entite.html',
        controller: 'StatistiquePEREntiteController'
    }).when('/drh/pats',{
        templateUrl:'statistique/statistique-drh.html',
        controller: 'StatistiquePATSController'
    }).when('/drh/pats/e',{
        templateUrl:'statistique/statistique-drh-entite.html',
        controller: 'StatistiquePATSEntiteController'
    }).when('/service/statistique/:id',{
        templateUrl:'statistique/statistique-service.html',
        controller: 'StatistiqueServiceController'
    }).otherwise({
        redirectTo: '/404'
    });
    
    
});

