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
    }).when('/drh/per',{
        templateUrl:'statistique/statistique-drh.html',
        controller: 'StatistiquePERController'
    }).when('/drh/pats',{
        templateUrl:'statistique/statistique-drh.html',
        controller: 'StatistiquePATSController'
    }).otherwise({
        redirectTo: '/404'
    });
    
    
});

