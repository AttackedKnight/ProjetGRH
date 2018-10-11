/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('AccesController', function ($scope, $q, Securite, Groupe, SweetAlert, TypeEmploye, GroupeTypeEmploye, AccesGroupeTable)
{
    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }

    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */


    TypeEmploye.findAll().success(function (data) {
        $scope.typeemployes = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types d'employés");
    });


    $scope.groupes = [];
    $scope.groupe = {id: ""};
    $scope.groupeCree = {};
    $scope.typeEmployeSelectionne = [];

    $scope.listeAcces = [];
    $scope.accesTable = {};


    /*RECUPERER LE(S) TYPE(S) D'EMPLOYE ASSOCIE(S) A CHAQUE GROUPE*/
    $scope.getTypeEmployeGroupe = function () {
        var promise;
        var req_tab = [];

        for (var i = 0; i < $scope.groupes.length; i++) {
            promise = GroupeTypeEmploye.findByGroupe($scope.groupes[i].id);
            req_tab.push(promise);
        }

        $q.all(req_tab).then(function (results) {
            for (var i = 0; i < $scope.groupes.length; i++) {
                if (results[i].data) {
                    $scope.groupes[i].typeemployes = results[i].data;
                } else {
                    $scope.groupes[i].typeemployes = [];
                }
            }
            SweetAlert.finirChargementSucces("Chargement complet !");
            if ($scope.groupes.length == 0) {
                SweetAlert.notificationAvecSuggestion("info", "Vide",
                        "Aucun groupe créé pour le moment",
                        "<h5><i>Clicker <a href='#/parametrage/groupe/new'>ici</a> pour ajouter un groupe</i><h5>");
            }
        }, function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des types d'employé");
        });
    };

    //Recuperer les groupes d'utilisateur existants


    $scope.getGroupes = function () {
        Groupe.getGroupes().success(function (data) {
            $scope.groupes = data;
            $scope.getTypeEmployeGroupe();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des groupes d'utilisateurs !");
        });
    };
    $scope.getGroupes();

    $scope.addGroupeTypeEmploye = function (groupe) {
        var promise;
        var req_tab = [];
        for (var i = 0; i < $scope.typeEmployeSelectionne.length; i++) {
            promise = GroupeTypeEmploye.add({
                id: "",
                groupe: groupe,
                typeEmploye: $scope.typeEmployeSelectionne[i]
            });
            req_tab.push(promise);
        }

        $q.all(req_tab).then(function () {
            $scope.typeEmployeSelectionne = [];
            $scope.getGroupes();
            $scope.groupe = {id: ""};
            SweetAlert.notificationAvecSuggestion("success", "Succes", "Groupe d'utilisateur créé avec succes",
                    "<h5><i>Clicker <a href='#/parametrage/groupe/show'>ici</a> pour voir le(s) groupe(s)</i><h5>");

            $('.choixTypeEmploye').removeAttr("checked");


        });
    };


    //Creer un nouveau groupe d'utilisateur

    $scope.createGroupe = function (groupe) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Groupe.newGroupe(groupe).success(function () {
            //Recuperation du groupe nouvellement crée
            Groupe.getLastGroupe().success(function (data) {
                $scope.addGroupeTypeEmploye(angular.copy(data));
                $scope.groupeCree = data;

                //parcourir la liste des acces et inserer chaque ligne dans la base de données         
                for (i = 0; i < $scope.listeAcces.length; i++) {
                    $scope.listeAcces[i].groupe = $scope.groupeCree;
                    $scope.createAccess($scope.listeAcces[i]);
                }
                //Réinitialiser la liste des acces et l'objet groupeCree crée
                $scope.groupeCree = {};
                $scope.listeAcces = [];
                construireListeAcces();

            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la création des droit d'access");
            });
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le groupe d'utilisateur n'a pas pu etre créé");
        });
    };




    //Recuperer les noms de table de la base de donnees:pour la creation du formulaire

    $scope.getTables = function () {       
        Groupe.listerTable().success(function (data) {
            $scope.tables=data;
            $scope.tables = ($scope.tables).split("-");
            construireListeAcces();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des tables");
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

    //Creer une permision pour un groupe(sur une table donnée)

    $scope.createAccess = function (a) {
        AccesGroupeTable.newAccess(a).success(function () {
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la création des droit d'access");
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
        var req_tab = [];
        var promise;
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        //On recupere d'abord les acces de ce groupe dans la table accesgroupe pour les supprimer
                        AccesGroupeTable.showGroupeAccess(groupe).success(function (data) {
                            for (i = 0; i < data.length; i++) {
                                AccesGroupeTable.deleteAccess(data[i].id);
                            }
                            //On supprime le groupe
                            /*Enlever d'abord les entrees de la table de jointure : groupetypeemploye*/
                            for (var i = 0; i < groupe.typeemployes.length; i++) {
                                console.log("sup groupe");
                                promise = GroupeTypeEmploye.deleteByGroupeAndTypeEmploye({
                                    groupe: groupe.id,
                                    typeemploye: groupe.typeemployes[i].id
                                });
                                req_tab.push(promise);

                            }
                            $q.all(req_tab).then(function () {

                                /*Supprimer l'element de la table groupe*/
                                Groupe.deleteGroupe(groupe.id).success(function () {
                                    SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                                    $scope.getGroupes();
                                }).error(function () {
                                    SweetAlert.simpleNotification("error", "Erreur", "Echec de la supression");
                                });

                            }, function () {
                                SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                            });


                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la supression des permissions");
                        });
                    }
                });

    };
});