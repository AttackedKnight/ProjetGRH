angular.module('AuthentificationModule').factory('Securite', function ($rootScope, $cookies, SweetAlert, AccesGroupeTable) {


    return{
        initAffichage: function () {
            $rootScope.globals = JSON.parse($cookies.get('globals'));
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
            AccesGroupeTable.showGroupeAccess($rootScope.globals.currentUser.user.groupe).success(function (p) {
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

                $('header').removeAttr('hidden');
                $('aside').removeAttr('hidden');
                $('footer').removeAttr('hidden');
                $('.content-header').removeAttr('hidden');
                $('.content-wrapper').removeAttr('style');
                setTimeout(function () {
                    $('.firstView')[0].click();
                }, 2000);
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération des permissions");
            });


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


