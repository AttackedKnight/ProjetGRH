/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('StatistiqueModule',['ngRoute','ngMessages'])
.config(function ($routeProvider){
    $routeProvider.when('/drh/per',{
        templateUrl:'statistique/statistique-per.html',
        controller: 'StatistiquePERController'
    }).when('/drh/pats',{
        templateUrl:'statistique/statistique-pats.html',
        controller: 'StatistiquePATSController'
    }).otherwise({
        redirectTo: '/404'
    });
    
    
});

