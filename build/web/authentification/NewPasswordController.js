/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('AuthentificationModule').controller('NewPasswordController', function ($scope, Securite,
        Connexion, Securite, $cookies,$routeParams, $window, SweetAlert)
{
    (function init() {  //Lanc?e a chaque fois que la page est affich?e
        Securite.hide();
        Connexion.clearCredentials();
    })();

    $scope.controlForm = function () {
        if ($scope.motDePasse == null || $scope.motDePasse == "") {
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        } else {
            $scope.resetPassword();
        }
    };

//    /*Verifier si le cookies cree au moment de l'envoie de l'email existe toujour :
//     * Si oui, continuer les operations
//     * Sinon , le lien a expire, il faut recommencer la procedure de reinitialisaion*/
//    $scope.checkCookieExpiration = function () {
//        $scope.accountEmail = $cookies.get('newPasswordAccountEmail') ? JSON.parse($cookies.get('newPasswordAccountEmail')) : "";
//        if ($scope.accountEmail == "") {  //Si le lien a expire
//            alert("Le lien a expiré, veuillez reprendre la procedure");
//            $window.location.href = '#/authentification/recoverpassword';
//        }
//    };
//    $scope.checkCookieExpiration();

    $scope.checkUtilisateur = function () {
        if (angular.isDefined($routeParams.user)) {
            $scope.idUser = $routeParams.user;
        } else {
            alert("Lien non valide, veuillez reprendre la procedure");
            $window.location.href = '#/authentification/recoverpassword';
        }

    };
    $scope.checkUtilisateur();

    $scope.resetPassword = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");

        Connexion.setAdminCredentials({login: "superadmin", motDePasse: "superadmin"});    //Utile pour authentifier la requete       
        Connexion.find($scope.idUser).success(function (data) {  //recuperer l'utilisateur
            data.motDePasse = $scope.motDePasse;    //definir le nouveau mot de passe
            Connexion.edit(data).success(function () {  //mettre a jour le compte utilisateur
                SweetAlert.simpleNotification("success", "Succes", "Mot de passe réinitialisé avec succes !");
                Connexion.clearAdminCredentials();
                $scope.motDePasse = "";
                $scope.motDePasseConfirm = "";
                $scope.suggererRedirection();
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la mise à jour du compte");
            });
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la mise à jour du compte");
        });
        
//        
//        Connexion.getUtilisateurByEmail($scope.accountEmail).success(function (data) {  //recuperer l'utilisateur
//            data.motDePasse = $scope.motDePasse;    //definir le nouveau mot de passe
//            Connexion.edit(data).success(function () {  //mettre a jour le compte utilisateur
//                SweetAlert.simpleNotification("success", "Succes", "Mot de passe réinitialisé avec succes !");
//                Connexion.clearAdminCredentials();
//                $scope.motDePasse = "";
//                $scope.motDePasseConfirm = "";
//                $scope.suggererRedirection();
//            }).error(function () {
//                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la mise à jour du compte");
//            });
//        }).error(function () {
//            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la mise à jour du compte");
//        });

    };

    $scope.suggererRedirection = function () {
        Promise.resolve(SweetAlert.demandeAction("Information", "Retourner à la page de connexion ? "))
                .then(function (value) {
                    if (value == true) {
                        $window.location.href = '#/';
                    }
                });
    };


});
