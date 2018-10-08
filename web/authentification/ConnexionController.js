/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('AuthentificationModule').controller('ConnexionController', function ($scope,$interval ,$cookies, $rootScope, Connexion, Securite, GroupeTypeEmploye)
{
    $scope.utilisateur = {id: ""};


    $scope.$on('$routeChangeStart', function ($event, next, current) {
        if ($rootScope.globals == null || $rootScope.globals.currentUser == null)
        {
            $event.preventDefault();
        }

    });


    (function end() {   //Lanc?e ? la d?connexion
        var logout = document.location.href.substring(document.location.href.lastIndexOf("/"), document.location.href.length);
        if (logout === "/logout") {
            Connexion.clearCredentials();
            Connexion.logout().success(function (data) {
                if(data.value == true){
                    console.log('Déconnecté'); 
                }
            }).error(function () {
                console.log("Session non detruite");
            });
        }

    })();


    (function init() {  //Lanc?e a chaque fois que la page est affich?e
        Securite.hide();
        var cookie = $cookies.get('globals');
        if (cookie != null) {
            cookie = JSON.parse(cookie);
            $scope.utilisateur.login = cookie.currentUser.user.login;
        }
    })();

    $scope.controlForm = function (c) {

        if (c.login == null || c.login == "") {
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        } else {
            if (c.motDePasse == null || c.motDePasse == "") {
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            } else {
                $scope.connecterUtilisateur(c);
            }
        }

    };

    function checkSession(){
        console.log('checking session validity');
        Connexion.sessionTimeOut().success(function (data) {
                if(data.value == false){
                    $interval.cancel($scope.checkConnected);
                    window.location.href = "#/logout"
                }
            }).error(function () {
                console.log("Erreur lors de la vérification de la validité de la session");
            });
    }
//    var connected = true;
    

    $scope.connecterUtilisateur = function (c) {
        Connexion.login(c).success(function (user) {
            if (user) {
                /*Recuperer les type(s) d'employe associe*/
                GroupeTypeEmploye.findIDListByGroupe(user.groupe.id).success(function (idType) {
                   GroupeTypeEmploye.findByGroupe(user.groupe.id).success(function (types) {
                        swal({

                            html: '<div class="cssload-loader-inner" style="height:350px;background-color:white;">\n\
                            <div class="cssload-cssload-loader-line-wrap-wrap">\n\
                            <div class="cssload-loader-line-wrap">\n\
                            </div></div>\n\
                            <div class="cssload-cssload-loader-line-wrap-wrap">\n\
                            <div class="cssload-loader-line-wrap"></div></div>\n\
                            <div class="cssload-cssload-loader-line-wrap-wrap">\n\
                            <div class="cssload-loader-line-wrap"></div></div>\n\
                            <div class="cssload-cssload-loader-line-wrap-wrap">\n\
                            <div class="cssload-loader-line-wrap"></div></div>\n\
                            <div class="cssload-cssload-loader-line-wrap-wrap">\n\
                            <div class="cssload-loader-line-wrap"></div></div></div>',
                            showConfirmButton: false,
                            timer: 3000
                        });
                        Connexion.setCredentials(user, idType.value,types);
                        /*Redirection et affichage interface*/
                        if (Securite.estConnecte() == true) {
                            $('header').removeAttr('hidden');
                            $('aside').removeAttr('hidden');
                            $('footer').removeAttr('hidden');
                            $('.content-header').removeAttr('hidden');
                            $('.content-wrapper').removeAttr('style');
                            $scope.checkConnected=$interval(checkSession,65000);
                            setTimeout(function() {
                            $('.firstView')[0].click();
                            }, 2000);
                        }


                    }).error(function () {
                         swal({
                            position: 'top-end',
                            type: 'error',
                            title: 'Login et(ou) mot de passe incorrect(s)',
                            showConfirmButton: false,
                            backdrop: `
                        rgba(255,0,0,0.4)
                        center left
                        no-repeat
  `,
                    timer: 2000
                });
                    });


                }).error(function () {
                    swal({
                        position: 'top-end',
                        type: 'error',
                        title: 'Login et(ou) mot de passe incorrect(s)',
                        showConfirmButton: false,
                        backdrop: `
                    rgba(255,0,0,0.4)
                    center left
                    no-repeat
  `,
                        timer: 2000
                    });
                });

            } else {
                swal({
                    position: 'top-end',
                    type: 'error',
                    title: 'Login et(ou) mot de passe incorrect(s)',
                    showConfirmButton: false,
                    backdrop: `
                rgba(255,0,0,0.4)
                center left
                no-repeat
  `,
                    timer: 2000
                });
            }
        }).error(function () {
            $scope.erreurConnexion = "Login et(ou) mot de passe incorrect(s)";
        });

    };
});
