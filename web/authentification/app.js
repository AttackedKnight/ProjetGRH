/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * Ce module gere tout ce qui est authentification et profil utilisateur
 * */

angular.module('AuthentificationModule', ['ngRoute', 'ngMessages'])
        .config(function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'authentification/connexion/login.html',
                controller: 'ConnexionController'

            }).when('/authentification/profil', {
                templateUrl: 'authentification/connexion/profil.html',
                controller: 'ProfilController'
                
            }).when('/logout', {
                templateUrl: 'authentification/connexion/login.html',
                controller: 'ConnexionController'
                
            }).when('/404', {
                templateUrl: 'authentification/connexion/404.html'
            }).otherwise({
                redirectTo: '/404'
            });


        });



