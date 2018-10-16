/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('AuthentificationModule').controller('ConnexionController', function ($scope,Securite, Connexion, Securite, GroupeTypeEmploye)
{
    $scope.utilisateur = {id: ""};

    (function init() {  //Lanc?e a chaque fois que la page est affich?e
        Securite.hide();
        Connexion.clearCredentials();
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
        Connexion.login(c).success(function (user) {
            if (user) {
                Connexion.setCredentials(user,{},{});   //Pour authentfier la prochaine requete
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
                        Securite.initAffichage();   /*Redirection et affichage interface*/
                        

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
