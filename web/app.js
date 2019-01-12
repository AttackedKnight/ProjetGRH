/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * 
 * MODULE GLOBAL DE L'APPLICATION
 */
angular.module('globalModule', ['ngRoute', 'ngMessages', 'EmployeModule',
    'ngCookies', 'angularFileUpload', 'DrhModule', 'ParametrageModule', 'AuthentificationModule',
    'StatistiqueModule', 'ServiceModule', 'datatables', 'checklist-model', 'angular.filter'])
        .run(function ($rootScope, $location, $cookies, $http, SweetAlert, AccesGroupeTable) {
            // keep user logged in after page refresh
            $rootScope.globals = $cookies.get('globals') ? JSON.parse($cookies.get('globals')) : {};
            $rootScope.credentials = $cookies.get('credentials') ? JSON.parse($cookies.get('credentials'))  : {};             
            if ($rootScope.globals.currentUser && $rootScope.credentials.authdata) {
                var cookie = $rootScope.credentials;
                $http.defaults.headers.common['Authorization'] = 'Basic ' + cookie.authdata; // jshint ignore:line
            }
            $rootScope.$on('$locationChangeStart', function (event, next, current) {
                // redirect to login page if not logged in
                if ($location.path() !== '/') {
                    if (!$rootScope.globals.currentUser && !$rootScope.credentials.authdata) {
                        if($location.path() !== '/authentification/recoverpassword' &&
                                $location.path() !== '/authentification/newpassword'){
                            $location.path('/');
                        }
                    } 
                    else {
                        //Afficher interface de travail
                        $('.no-print').css('display', 'none');
                        $('header').removeAttr('hidden');
                        $('aside').removeAttr('hidden');
                        $('footer').removeAttr('hidden');
                        $('.content-header').removeAttr('hidden');
                        $('.content-wrapper').removeAttr('style');
                        $('body').css('padding-right', '0px');
                        
                        var cookie = $rootScope.globals;
                        /*Pour les utilisateurs appartenant au groupe employe*/
                        $rootScope.prenomUtilisateur = cookie.currentUser.user.employe ? cookie.currentUser.user.employe.prenom : "";
                        $rootScope.nomUtilisateur = cookie.currentUser.user.employe ? cookie.currentUser.user.employe.nom : "";
                        $rootScope.idEmploye = cookie.currentUser.user.employe ? cookie.currentUser.user.employe.id : "";
                        /*Pour les utilisateurs appartenant au groupe employe*/
                        $rootScope.groupeUtilisateur = cookie.currentUser.user.groupe;
                        $rootScope.typeEmployeAssocie = cookie.currentUser.typeEmployeAssocie;
                        $rootScope.avatarUtilisateur = cookie.currentUser.user.avatar;
                        $rootScope.entiteUtilisateur = cookie.currentUser.user.entite;
                        $rootScope.typeEmploye_o = cookie.currentUser.typeEmploye_o;

                        /*Recuperation des permissions*/
                        $rootScope.angular = angular;
                        if (!$rootScope.myPermission || $rootScope.myPermission.length == 0) {
                            AccesGroupeTable.showGroupeAccess($rootScope.groupeUtilisateur).success(function (p) {
                                $rootScope.myPermission = p;
                                $rootScope.avoirPermission = function (action, nomTable) {
                                    if (action == 'ajouter' || action == 'modifier' || action == 'supprimer' || action == 'lister' || action == 'consulter') {
                                        for (var i = 0; i < $rootScope.myPermission.length; i++) {
                                            if ($rootScope.myPermission[i].nomTable == nomTable) {
                                                if (action == 'ajouter') {
                                                    return $rootScope.myPermission[i].ajouter;
                                                }
                                                if (action == 'modifier') {
                                                    return $rootScope.myPermission[i].modifier;
                                                }
                                                if (action == 'supprimer') {
                                                    return $rootScope.myPermission[i].supprimer;
                                                }
                                                if (action == 'lister') {
                                                    return $rootScope.myPermission[i].lister;
                                                }
                                                if (action == 'consulter') {
                                                    return $rootScope.myPermission[i].consulter;
                                                }
                                            }
                                        }
                                        return false;
                                    } else {
                                        return false;
                                    }
                                };
                            }).error(function () {
                                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération des permissions");
                            });
                        }

                    }
                }

            });
            $rootScope.$watch('$viewContentLoaded', function () {
                $('body').css('padding-right', '0px');
            });
        });

/*Sur serveur*/
//var chemin="https://10.157.20.203:8080/ProjetGRH"; 

/*En local:new port*/
//var chemin="http://localhost:33967/ProjetGRH";


var chemin = "/ProjetGRH";


