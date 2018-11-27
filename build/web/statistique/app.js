/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Module pour gerer la partie reporting(Statistiques).
 * */

/*Utiliser une meme page, des routes differentes,appeler different controlleurs*/
angular.module('StatistiqueModule', ['ngRoute', 'ngMessages'])
        .config(function ($routeProvider) {
            $routeProvider.when('/drh/statistique/general', {   //ok
                templateUrl: 'statistique/statistique-generale.html',
                controller: 'StatistiqueGeneraleController'
                
            }).when('/drh/statistique/entite', {    //ok
                templateUrl: 'statistique/statistique-entite.html',
                controller: 'StatistiqueEntiteController'
                
            }).when('/drh/statistique/entreeSortie', {    //ok
                templateUrl: 'statistique/statistique-entree-sortie.html',
                controller: 'EntreeSortieController'
                
            }).when('/service/statistique/:entite', {  //ok
                templateUrl: 'statistique/statistique-entite.html',
                controller: 'StatistiqueEntiteController'
                
            }).when('/service/statistique/entreeSortie/:entite', {    //ok
                templateUrl: 'statistique/statistique-entree-sortie.html',
                controller: 'EntreeSortieController'
                
            }).otherwise({
                redirectTo: '/404'
            });


        });

