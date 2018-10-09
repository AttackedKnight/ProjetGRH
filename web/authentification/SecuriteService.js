angular.module('AuthentificationModule').factory('Securite', function ($rootScope, $cookies, $interval, Connexion, SweetAlert, AccesGroupeTable) {


    return{

        estConnecte: function () {
//            $("#ecran_attente").show();
            if (!$cookies.get('globals'))
            {
                return false;
            } else {

                var cookie = JSON.parse($cookies.get('globals'));

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
                $('.no-print').css('display', 'none');
                $('header').removeAttr('hidden');
                $('aside').removeAttr('hidden');
                $('footer').removeAttr('hidden');
                $('.content-header').removeAttr('hidden');
                $('.content-wrapper').removeAttr('style');
                $('body').css('padding-right', '0px');

                $rootScope.checkSession = function () {
                    Connexion.sessionTimeOut().success(function (data) {
                        if (data.value == false) {
                            $interval.cancel($rootScope.checkConnected);
                            window.location.href = "#/logout"
                        }
                    }).error(function () {
                        console.log("Erreur lors de la vérification de la validité de la session");
                    });
                };

                if (!$rootScope.myPermission || $rootScope.myPermission.length == 0) {
                    AccesGroupeTable.showGroupeAccess($rootScope.groupeUtilisateur).success(function (p) {
                        $rootScope.myPermission = p;

                        $rootScope.avoirPermission = function (action, nomTable) {
                            //                        console.log('je suis appele');
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
                        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la r?cup?ration des permissions");
                    });
                }

                $rootScope.$watch('$viewContentLoaded', function () {
                    /*$("#ecran_attente").hide();*/
                    $('body').css('padding-right', '0px');

                });

                return true;

            }
        },
        hide: function () {


            $('body').addClass('fixed');
            $('.no-print').css('display', 'none');

            $('header').attr('hidden', 'hidden');
            $('aside').attr('hidden', 'hidden');
            $('footer').attr('hidden', 'hidden');
            $('.content-header').attr('hidden', 'hidden');

            $('.content-wrapper').css('background', 'transparent');


        }

    };


});


