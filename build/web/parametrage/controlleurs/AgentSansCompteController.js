/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('AgentSansCompteController', function ($scope, Utilisateur,
        SweetAlert, Servir, Mail, Groupe, Contact)
{

    $scope.employes = [];

    Groupe.findByLibelle("employe").success(function (data) {
        $scope.groupe = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement du groupe utilisateur");
    });

    $scope.initUtilisateur = function ()
    {
        $scope.utilisateur = {id: "", avatar: "images/avatar.png"};
    };
    $scope.initUtilisateur();

    //Recuperer les comptes d'utilisateur

    $scope.getEmployeSansCompte = function () {

        Servir.getEmployeSansCompte().success(function (data) {
            SweetAlert.finirChargementSucces("Chargement complet !");
            $scope.employes = data;
            console.log(data);
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des comptes utilisateur !");
        });
    };
    $scope.getEmployeSansCompte();

    $scope.envoyerMail = function (email) {
        var corps = "\tUNIVERSITE DE THIES \nDIRECTON DES RESSOURCES HUMAINES ET DE LA FORMATION\n\n";
        corps += "Bonjour , veuillez utiliser les identifiants suivants pour vous connectez à votre compte\n\n\
            Login : " + $scope.utilisateur.login + "\nMot de passe : " + $scope.utilisateur.motDePasse;
        var msg = 'to=' + email + '&objet=identifiants de connexion&body=' + corps;

        Mail.sendEmail(msg).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Compte crée avec succes<br>\n\
            Rendez-vous sur son boite email pour recuperer ses identifiants de connexion");
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "L'envoi du mail a échoué");
        });
        $scope.getEmployeSansCompte();
        $scope.initUtilisateur();
    };

    $scope.creerCompteUtilisateur = function (employe) {

        //Un compte utilisateur est cree pour un employe permanent
        Contact.findByEmploye(employe).success(function (data) {
            if (data && angular.isDefined(data.email)) {
                
                $scope.utilisateur.employe = employe;
                $scope.utilisateur.email = data.email;
                $scope.utilisateur.groupe = $scope.groupe;

                $scope.utilisateur.login = "ut" + employe.matriculeInterne.replace("/", "");
                $scope.utilisateur.motDePasse = "passut2018";

                Utilisateur.createCompte($scope.utilisateur).success(function () {
                    $scope.envoyerMail(data.email);
                }).error(function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la création du compte utilisateur");
                });
            } else {
                SweetAlert.finirChargementEchec("Veuillez renseigner l'adrresse email de cet employe d'abord");
            }
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des contacts !");
        });



    };
});