/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('AccesController', function ($scope, Securite, Groupe, SweetAlert, AccesGroupeTable)
{
    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }



    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */


    $scope.groupes = [];
    $scope.groupe = {id: ""};
    $scope.groupeCree = {};


    $scope.listeAcces = [];
    $scope.accesTable = {};

    //Recuperer les groupes d'utilisateur existants

    $scope.getGroupes = function () {
        Groupe.getGroupes().success(function (data) {
            $scope.groupes = data;
            SweetAlert.finirChargementSucces("Chargement complet !");
            if ($scope.groupes.length == 0) {
                SweetAlert.notificationAvecSuggestion("info", "Vide",
                        "Aucun groupe cree pour le moment", 
                        "<h5><i>Clicker <a href='#/parametrage/groupe/new'>ici</a> pour ajouter un groupe</i><h5>");
            }
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des groupes d'utilisateur !");
        });
    };
    $scope.getGroupes();



    //Creer un nouveau groupe d'utilisateur

    $scope.createGroupe = function (groupe) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Groupe.newGroupe(groupe).success(function (data) {
            $scope.getGroupes();
            $scope.groupe = {id: ""};

            //Recuperation du groupe nouvellement crÃ©e
            Groupe.getLastGroupe().success(function (data) {
                $scope.groupeCree = data;

                //parcourir la liste des acces et inserer chaque ligne dans la base de donnÃ©es         
                for (i = 0; i < $scope.listeAcces.length; i++) {
                    $scope.listeAcces[i].groupe = $scope.groupeCree;
                    $scope.createAccess($scope.listeAcces[i]);
                }
                SweetAlert.notificationAvecSuggestion("success", "Succes", "Groupe d'utilisateur crée avec succes",
                "<h5><i>Clicker <a href='#/parametrage/groupe/show'>ici</a> pour voir le(s) groupe(s)</i><h5>");
                //RÃ©initialiser la liste des acces et l'objet groupeCree crÃ©e
                $scope.groupeCree = {};
                $scope.listeAcces = [];
                construireListeAcces();

            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la creation des droit d'access");
          });
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le groupe d'utilisateur n'a pas pu etre crée");
      });
    };




    //Recuperer les noms de table de la base de donnees:pour la creation du formulaire

    $scope.getTables = function () {
        Groupe.listerTable().success(function (data) {
            $scope.tables = data;
            $scope.tables = ($scope.tables).split("-");
            construireListeAcces();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération des tables");
        });
    };
    $scope.getTables();

    //Creer les objets AccesTable a afficher dans le formulaire(ligne du formulaire)

    function construireListeAcces() {
        for (i = 0; i < $scope.tables.length; i++) {
            $scope.accesTable.id = "";
            $scope.accesTable.nomTable = $scope.tables[i];
            $scope.accesTable.ajouter = false;
            $scope.accesTable.modifier = false;
            $scope.accesTable.supprimer = false;
            $scope.accesTable.consulter = false;
            $scope.accesTable.lister = false;

            $scope.listeAcces.push($scope.accesTable);
            $scope.accesTable = {};
        }
    }

    //Creer une permision pour un groupe(sur une table donnÃ©e)

    $scope.createAccess = function (a) {
        AccesGroupeTable.newAccess(a).success(function (data) {
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la creation des droit d'access");
});
    };

    //Creation du groupe
    $scope.creerGroupeEtAcces = function (nouvelGroupe) {

        var g = nouvelGroupe;
        if (g.code == null || g.code == "") {
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        } else {
            //Creer d'abord le groupe
            if (g.libelle == null || g.libelle == "") {
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            } else {
                $scope.createGroupe(g);
            }
        }


    };

    $scope.cocherAjouter = function () {
        for (i = 0; i < $scope.listeAcces.length; i++) {
            $scope.listeAcces[i].ajouter = $scope.a;
        }
    };

    $scope.cocherSupprimer = function () {
        for (i = 0; i < $scope.listeAcces.length; i++) {
            $scope.listeAcces[i].supprimer = $scope.s;
        }
    };

    $scope.cocherModifier = function () {
        for (i = 0; i < $scope.listeAcces.length; i++) {
            $scope.listeAcces[i].modifier = $scope.m;
        }
    };

    $scope.cocherLister = function () {
        for (i = 0; i < $scope.listeAcces.length; i++) {
            $scope.listeAcces[i].lister = $scope.l;
        }
    };

    $scope.cocherConsulter = function () {
        for (i = 0; i < $scope.listeAcces.length; i++) {
            $scope.listeAcces[i].consulter = $scope.c;
        }
    };

    $scope.activer = function (e, etat) {

        e.ajouter = e.supprimer = e.consulter = e.modifier = e.lister = etat;
    };

    $scope.supprimerGroupe = function (groupe) {
        bootbox.confirm({
            title: "Suppression !",
            message: "Voulez vous supprimer l'Ã©lement",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Annuler'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirmer'
                }
            },
            callback: function (result) {
                if (result == true) {
                    var dialog = bootbox.dialog({
                        title: 'SUPPRESSION',
                        message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Suppression ...</span></p>'
                    });
                    //On recupere d'abord les acces de ce groupe dans la table accesgroupe pour les supprimer
                    AccesGroupeTable.showGroupeAccess(groupe).success(function (data) {
                        for (i = 0; i < data.length; i++) {
                            AccesGroupeTable.deleteAccess(data[i].id);
                        }
                        //On supprime le groupe
                        Groupe.deleteGroupe(groupe.id).success(function (data) {
                            $scope.getGroupes();
                            dialog.modal('hide');
                        }).error(function () {
                            dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
                        });

                    }).error(function () {
                        dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Les acces du groupe n\'ont pas pu etre supprimer</div>');

                    });
                }
            }
        });

    };
});