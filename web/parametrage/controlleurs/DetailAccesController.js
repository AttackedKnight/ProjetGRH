
//Visualiser les details d' groupe d'utilisateur

angular.module('ParametrageModule').controller('DetailAccesController', function ($scope, $q, TypeEmploye, 
GroupeTypeEmploye, Groupe, SweetAlert, AccesGroupeTable, $routeParams)
{


    TypeEmploye.findAll().success(function (data) {
        $scope.typeemployes = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types d'employés");
    });
    $scope.typeEmployeSelectionne=[];
    
    /*RECUPERER LE(S) TYPE(S) D'EMPLOYE ASSOCIE(S) A CHAQUE GROUPE*/
    $scope.getTypeEmployeGroupe = function () {
        GroupeTypeEmploye.findByGroupe($scope.groupe.id).success(function(data){
            if(data){
               $scope.groupe.typeemployes=data; 
            }
            else{
                $scope.groupe.typeemployes=[];
            }
            
            $scope.typeEmployeSelectionne=angular.copy($scope.groupe.typeemployes);
        }).error(function(){
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des types d'employés");
        });
       
    };

    $scope.editGroupeTypeEmploye = function (groupe) {

        var promise;
        var req_tab = [];

        /*LA MISE A JOUR DANS LA TABLE DE JOINTURE "groupetypeemplye" consistera a :
         * 
         * -->supprimer une ou (des) entree(s) dans cette table s'il y a de(s) elements deselectionnes
         * 
         * -->ajouter une ou (des) entree(s) dans cette table s'il y a de(s) nouvelle(s) selection
         * */

        /*Verifier s 'il y a de new elements*/
        for (var i = 0; i < $scope.typeEmployeSelectionne.length; i++) {
            if ($scope.chercherTypeEmploye($scope.typeEmployeSelectionne[i], groupe.typeemployes) == -1)
            {
                promise = GroupeTypeEmploye.add({
                    id: "",
                    groupe: groupe,
                    typeEmploye: $scope.typeEmployeSelectionne[i]
                });
                req_tab.push(promise);
            }

        }
        /*Verifier s 'il y a deS element(s) qui ne figurent plus sur la nouvelle liste*/
        for (var i = 0; i < groupe.typeemployes.length; i++) {
            if ($scope.chercherTypeEmploye(groupe.typeemployes[i], $scope.typeEmployeSelectionne) == -1) {
                promise = GroupeTypeEmploye.deleteByGroupeAndTypeEmploye({
                    groupe: groupe.id,
                    typeemploye: groupe.typeemployes[i].id
                });
                req_tab.push(promise);
            }

        }
        $q.all(req_tab).then(function () {
            SweetAlert.notificationAvecSuggestion("success", "Succes", "Groupe d'utilisateur créé avec succes",
                    "<h5><i>Clicker <a href='#/parametrage/groupe/show'>ici</a> pour voir le(s) groupe(s)</i><h5>");
            $('.choixTypeEmploye').removeAttr("checked");

        }, function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
        
        
    };

    $scope.chercherTypeEmploye = function (el, tab) {

        for (var j = 0; j < tab.length; j++) {
            if (tab[j].id == el.id)
                return 1;
        }
        return -1;
    };

    var id = $routeParams.id;
    Groupe.getGroupe(id).success(function (data) {
        $scope.groupe = data;
        $scope.getTypeEmployeGroupe();
        AccesGroupeTable.showGroupeAccess($scope.groupe).success(function (data) {
            $scope.listeAcces = data;
            SweetAlert.finirChargementSucces("Chargement complet !");

            /*Verifier s'il n'y a des mises  à jour à apporter avant d'afficher*/
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
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des tables");
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
                            "Erreur lors de la recupération des droits d'acces");

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

    //Creer une permision pour un groupe(sur une table donnée)

    $scope.createAccess = function (a) {
        AccesGroupeTable.newAccess(a).success(function (data) {
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur",
                    "Une erreur est survenue lors de la cr�ation des droits d'acces");
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
                
                    $scope.modifierGroupeEtAcces(g);
                
                
            }
        }

    };

    $scope.modifierGroupeEtAcces = function (groupe) {

        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Groupe.editGroupe(groupe).success(function () {
            //parcourir la liste des acces pour les mettre a jour         
            $scope.editGroupeTypeEmploye(groupe)
            for (i = 0; i < $scope.listeAcces.length; i++) {
                $scope.editAccess($scope.listeAcces[i]);
            }
            
            
            
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

    $scope.editAccess = function (a) {
        AccesGroupeTable.editAccess(a).success(function () {
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
