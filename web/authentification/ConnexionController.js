/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('AuthentificationModule').controller('ConnexionController', function ($scope, $routeParams, $cookies, $rootScope, Connexion, Securite, $location)
{
    $scope.utilisateur = {id: ""};


    $scope.$on('$routeChangeStart', function ($event, next, current) {
        if ($rootScope.globals == null || $rootScope.globals.currentUser == null)
        {
            $event.preventDefault();
        }

    });


    (function end() {
        var logout = document.location.href.substring(document.location.href.lastIndexOf("/"), document.location.href.length);
        if (logout === "/logout") {
            Connexion.clearCredentials();
            Connexion.logout().success(function (data){
                console.log("Session detruite");
            }).error(function (){
                console.log("Session non detruite");
            });
        }

    })();


    (function init() {
        var cookie = $cookies.get('globals');
        if (cookie != null) {
            cookie = JSON.parse(cookie);
            $scope.utilisateur.login = cookie.currentUser.user.login;
        }
        Securite.hide();
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


    $scope.connecterUtilisateur = function (c) {
//        var dialog =bootbox.dialog({
//                            message: '<div class="cssload-loader-inner" style="margin-top:100px;background-color: white;height:500px;width:500px;">\n\
//                            <div class="cssload-cssload-loader-line-wrap-wrap">\n\
//                            <div class="cssload-loader-line-wrap">\n\
//                            </div></div>\n\
//                            <div class="cssload-cssload-loader-line-wrap-wrap">\n\
//                            <div class="cssload-loader-line-wrap"></div></div>\n\
//                            <div class="cssload-cssload-loader-line-wrap-wrap">\n\
//                            <div class="cssload-loader-line-wrap"></div></div>\n\
//                            <div class="cssload-cssload-loader-line-wrap-wrap">\n\
//                            <div class="cssload-loader-line-wrap"></div></div>\n\
//                            <div class="cssload-cssload-loader-line-wrap-wrap">\n\
//                            <div class="cssload-loader-line-wrap"></div></div></div>'
//                        });     


        Connexion.login(c).success(function (data) {
            if (data) {
                let timerInterval
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
                Connexion.setCredentials(data);
                /*Redirection et affichage interface*/
                
                //  dialog.modal('hide');

                $('header').removeAttr('hidden');
                $('aside').removeAttr('hidden');
                $('footer').removeAttr('hidden');
                $('.content-header').removeAttr('hidden');
                $('.content-wrapper').removeAttr('style');

                if (data.groupe.code == 'SUP_AD') {
                    $('#admin-menu').removeAttr('hidden');
                    document.location.href = "#/parametrage/utilisateur/show";
                }
                if (data.groupe.code == 'PER_AD') {
                    $('#drh-menu').removeAttr('hidden');
                    document.location.href = "#/drh/per";
                }
                if (data.groupe.code == 'PATS_AD') {
                    $('#drh-menu').removeAttr('hidden');
                    document.location.href = "#/drh/pats";
                }
                if (data.groupe.code == 'DRH_AD') {
                    $('#drh-menu').removeAttr('hidden');
                    document.location.href = "#/drh";
                }
                if (data.groupe.code == 'SERV_AD') {
                    $('#service-menu').removeAttr('hidden');
                    document.location.href = "#/service/statistique/" + data.entite.id;
                }
                if (data.groupe.code == 'EMP') {
                    $('#employe-menu').removeAttr('hidden');
                    document.location.href = "#/employe/detailAgent/" + data.employe.id;
                }
                if (data.groupe.code == '') {
                    document.location.href = "#/";
                }

                /*Redirection et affichage interface*/
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
                // dialog.modal('hide');
//                $scope.erreurConnexion="Login et(ou) mot de passe incorrect(s)";
            }
        }).error(function () {
            //dialog.modal('hide');
            $scope.erreurConnexion = "Login et(ou) mot de passe incorrect(s)";
        });

    };
});
