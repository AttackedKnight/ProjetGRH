
//Visualiser les details d' groupe d'utilisateur

angular.module('ParametrageModule').controller('DetailAccesController', function ($scope, $q, Securite, Groupe, SweetAlert, $rootScope, AccesGroupeTable, $routeParams)
{
    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    var id = $routeParams.id;
    Groupe.getGroupe(id).success(function (data) {
        $scope.groupe = data;
        AccesGroupeTable.showGroupeAccess($scope.groupe).success(function (data) {
            $scope.listeAcces = data;
            SweetAlert.finirChargementSucces("Chargement complet !");

            /*Verifier s'il n'y a des mises  Ã  jour Ã  apporter avant d'afficher*/
            $scope.getTables();

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de récupération des droits d'acces");
        });
    }).error(function () {
        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération\n\
        des informations du groupe d'utilisateur");
    });

    /*Verifier qu'il n'y a pas de nouvelle table ajoutees entre temps:Si oui on les ajoute*/

    $scope.getTables = function () {
        Groupe.listerTable().success(function (data) {

            $scope.tables = data;
            $scope.tables = ($scope.tables).split("-");

            $scope.checkNewAcces();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération des tables");
        });
    };

    $scope.avoirAcces = function (nomTable) {
        for (var i = 0; i < $scope.listeAcces.length; i++) {
            if ($scope.listeAcces[i].nomTable == nomTable) { //Si un acces n'est pas  encore definie pour cette table
                return true;
            }
        }
        return false;
    };

    $scope.tableExiste = function (nomTable) {
        for (var i = 0; i < $scope.tables.length; i++) {
            if ($scope.tables[i] == nomTable) { //Si la table n'existe plus dans la base : on supprime les permissions qu'elle avait
                return true;
            }
        }
        return false;
    };


    var req_add = [];
    var req_sup = [];





    $scope.checkNewAcces = function () {
        /*Ajouter permissions pour les nouvelles tables*/

        for (var i = 0; i < $scope.tables.length; i++) {
            if (!$scope.avoirAcces($scope.tables[i])) { //Si un acces n'est pas  encore definie pour cette table

                $scope.accesTable = {};

                $scope.accesTable.id = "";
                $scope.accesTable.nomTable = $scope.tables[i];
                $scope.accesTable.ajouter = false;
                $scope.accesTable.modifier = false;
                $scope.accesTable.supprimer = false;
                $scope.accesTable.consulter = false;
                $scope.accesTable.lister = false;
                $scope.accesTable.groupe = $scope.groupe;


                var promise = AccesGroupeTable.newAccess($scope.accesTable);
                req_add.push(promise);
            }

        }
        /*Ajouter permissions pour les nouvelles tables*/

        /*Supprimer permissions pour les  tables qui n'existent plus*/

        for (var i = 0; i < $scope.listeAcces.length; i++) {
            if (!$scope.tableExiste($scope.listeAcces[i].nomTable)) { //Si un acces n'est pas  encore definie pour cette table
                $scope.supprimerAcces($scope.listeAcces[i]);

                var promise = AccesGroupeTable.deleteAccess($scope.listeAcces[i].id);
                req_sup.push(promise);
            }
        }

        /*Supprimer permissions pour les  tables qui n'existent plus*/

        $q.all(req_add).then(function (result) {
            $q.all(req_sup).then(function () {
                AccesGroupeTable.showGroupeAccess($scope.groupe).success(function (data) {

                    $scope.listeAcces = data;
                }).error(function () {
                    SweetAlert.simpleNotification("error", "Erreur",
                            "Erreur lors de la récupération des droits d'acces");

                });
            });
        });
    };


    $scope.supprimerAcces = function (a) {
        AccesGroupeTable.deleteAccess(a.id).success(function (data) {
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur",
                    "Une erreur est survenue lors de la suppression des droits d'acces");

        });
    };

    //Creer une permision pour un groupe(sur une table donnÃ©e)

    $scope.createAccess = function (a) {
        AccesGroupeTable.newAccess(a).success(function (data) {
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur",
                    "Une erreur est survenue lors de la création des droits d'acces");
        });
    };


    /*Verifier qu'il n'y a pas de nouvelle table ajouter entre temps:Si oui on les ajoute*/

    $scope.controlForm = function (g) {

        if (g.code == null || g.code == "") {
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        } else {
            //Creer d'abord le groupe
            if (g.libelle == null || g.libelle == "") {
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            } else {
                //Modifier d'abord le groupe
                $scope.modifierGroupeEtAcces(g);
            }
        }

    };

    $scope.modifierGroupeEtAcces = function (groupe) {

        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Groupe.editGroupe(groupe).success(function (data) {
            //parcourir la liste des acces pour les mettre a jour         
            for (i = 0; i < $scope.listeAcces.length; i++) {
                $scope.editAccess($scope.listeAcces[i]);
            }
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            document.location.href = '#/parametrage/groupe/show';
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

    $scope.editAccess = function (a) {
        AccesGroupeTable.editAccess(a).success(function (data) {
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur",
                    "Une erreur est survenue lors de la modification des droits d'acces");
        });
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
});
