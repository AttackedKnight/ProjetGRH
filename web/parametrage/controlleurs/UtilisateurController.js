/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('UtilisateurController', function ($scope, Utilisateur, SweetAlert, Servir, Entite, Groupe)
{

    $scope.groupes = [];
    $scope.entites = [];


    $scope.utilisateurs = [];
    $scope.utilisateur = {id: "", avatar: "images/avatar.png"};
    $scope.UtilisateurCourant = {};

    Entite.findAll().success(function (data) {
        $scope.entites = data;
    }).error(function () {
        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des entités");
    });

    Groupe.getGroupes().success(function (data) {
        $scope.groupes = data;
    }).error(function () {
        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la r�cup�ration des groupes d'utilisateur");
    });

    //Trouver l'entite dans laquelle se trouve actuellement un employe

    $scope.getEntiteEmploye = function (id) {
        Servir.findEntiteEmploye(id).success(function (data) {
            return data.nom;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération de l'entité");
            
        });
    };

    //Recuperer les comptes d'utilisateur

    $scope.getComptes = function () {

        Utilisateur.getComptes().success(function (data) {
            SweetAlert.finirChargementSucces("Chargement complet !");
            $scope.utilisateurs = data;
            if ($scope.utilisateurs.length == 0) {
                SweetAlert.notificationAvecSuggestion("info", "Vide",
                        "Aucun compte utilisateur créé pour le moment",
                        "<h5><i>Clicker <a href='#/parametrage/utilisateur/new'>ici</a> pour ajouter un compte utilisateur</i><h5>");
            }
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des comptes utilisateur !");
        });
    };
    $scope.getComptes();


    $scope.controlForm = function (c) {
        if (c.entite == null) {
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        } else {
            if (c.groupe == null) {
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            } else {
                if (c.login == null || c.login == "") {
                    $("div.requis").eq(2).show("slow").delay(3000).hide("slow");
                } else {
                    if (c.motDePasse == null || c.motDePasse == "") {
                        $("div.requis").eq(3).show("slow").delay(3000).hide("slow");
                    } else {
                        c.email = c.entite.email;
                        $scope.creerCompteUtilisateur(c);
                    }
                }
            }
        }

    };


    $scope.creerCompteUtilisateur = function (c) {

        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Utilisateur.createCompte(c).success(function (data) {
            SweetAlert.notificationAvecSuggestion("success", "Succes", "Compte utilisateur créé avec succes",
                    "<h5><i>Clicker <a href='#/parametrage/utilisateur/show'>ici</a> pour voir le(s) compte(s) utilisateur</i><h5>");
            $scope.getComptes();
            $scope.utilisateur = {id: "", avatar: "images/avatar.png"};
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le compte utilisateur n'a pas pu etre créé");
        });
    };


    $scope.supprimerCompteUtilisateur = function (compte) {

        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        Utilisateur.deleteCompte(compte.id).success(function () {
                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                            $scope.getComptes();
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la supression");
                        });
                    }
                });

    };
});