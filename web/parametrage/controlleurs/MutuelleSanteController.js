/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('MutuelleSanteController', function ($scope, Securite, SweetAlert, TypeEmploye, $q, MutuelleSante, MutuelleTypeEmploye) {

    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    $scope.mutuelles = [];
    $scope.mutuelle = {id: ""};
    $scope.typeEmployeSelectionne = [];

    $scope.editForm = false;
    $scope.createForm = true;

    $scope.toggle = function () {
        $scope.editForm = !$scope.editForm;
        $scope.createForm = !$scope.createForm;
        if ($scope.editForm == true) {
            $scope.typeEmployeSelectionne = angular.copy($scope.mutuelle.typeemployes);
        }
    };

    TypeEmploye.findAll().success(function (data) {
        $scope.typeemployes = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types d'employés");
    });

    $scope.controlForm = function (c) {
        if (c.code == null || c.code == "") {
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        } else {
            if (c.nom == null || c.nom == "") {
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            } else {
                if ($scope.typeEmployeSelectionne.length == 0) {
                    $("div.requis").eq(2).show("slow").delay(3000).hide("slow");
                } else {
                    if ($scope.createForm == true) {
                        $scope.add(c);
                    } else {
                        $scope.edit(c);
                    }
                }

            }
        }
    };

    $scope.addMutuelleTypeEmploye = function (mutuelleSante) {
        var promise;
        var req_tab = [];
        for (var i = 0; i < $scope.typeEmployeSelectionne.length; i++) {
            promise = MutuelleTypeEmploye.add({
                id: "",
                mutuelleSante: mutuelleSante,
                typeEmploye: $scope.typeEmployeSelectionne[i]
            });
            req_tab.push(promise);
        }

        $q.all(req_tab).then(function () {
            $scope.typeEmployeSelectionne = [];
            $scope.findAll();
            SweetAlert.simpleNotification("success", "Succes", "Ajout effectué avec succes");
            $('.choixTypeEmploye').removeAttr("checked");


        });
    };

    /*RECUPERER LE(S) TYPE(S) D'EMPLOYE ASSOCIE(S) AU MUTUELLE*/
    $scope.getTypeEmployeMutuelle = function () {
        var promise;
        var req_tab = [];

        for (var i = 0; i < $scope.mutuelles.length; i++) {
            promise = MutuelleTypeEmploye.findByMutuelleSante($scope.mutuelles[i].id);
            req_tab.push(promise);
        }

        $q.all(req_tab).then(function (results) {
            for (var i = 0; i < $scope.mutuelles.length; i++) {
                if (results[i].data) {
                    $scope.mutuelles[i].typeemployes = results[i].data;
                } else {
                    $scope.mutuelles[i].typeemployes = [];
                }
            }
        },
                function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des types d'employés");
                });
    };

    $scope.findByLibelle = function (libelle) {
        MutuelleSante.findByLibelle(libelle).success(function (data) {
            $scope.addMutuelleTypeEmploye(data);
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le mutuelle de santé n'a pas pu etre recupéré");
        });
    };

    $scope.add = function (s) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        MutuelleSante.add(s).success(function () {
            $scope.findByLibelle(s.nom);
            $scope.mutuelle = {id: ""};
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le mutuelle de santé n'a pas pu etre ajouté");
        });
    };

    $scope.findAll = function () {
        MutuelleSante.findAll().success(function (data) {
            SweetAlert.finirChargementSucces("Chargement complet !");
            $scope.mutuelles = data;
            $scope.getTypeEmployeMutuelle();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des mutuelles de santé !");
        });
    };

    $scope.findAll();

    $scope.chercherTypeEmploye = function (el, tab) {

        for (var j = 0; j < tab.length; j++) {
            if (tab[j].id == el.id)
                return 1;
        }
        return -1;
    }

    $scope.editMutuelleTypeEmploye = function (mutuelleSante) {

        var promise;
        var req_tab = [];

        /*LA MISE A JOUR DANS LA TABLE DE JOINTURE "caissesociletypeemplye" consistera a :
         * 
         * -->supprimer une ou (des) entree(s) dans cette table s'il y a de(s) elements deselectionnes
         * 
         * -->ajouter une ou (des) entree(s) dans cette table s'il y a de(s) nouvelle(s) selection
         * */

        /*Verifier s 'il y a de new elements*/
        for (var i = 0; i < $scope.typeEmployeSelectionne.length; i++) {
            if ($scope.chercherTypeEmploye($scope.typeEmployeSelectionne[i], mutuelleSante.typeemployes) == -1)
            {
                promise = MutuelleTypeEmploye.add({
                    id: "",
                    mutuelleSante: mutuelleSante,
                    typeEmploye: $scope.typeEmployeSelectionne[i]
                });
                req_tab.push(promise);
            }

        }
        /*Verifier s 'il y a deS element(s) qui ne figurent plus sur la nouvelle liste*/
        for (var i = 0; i < mutuelleSante.typeemployes.length; i++) {
            if ($scope.chercherTypeEmploye(mutuelleSante.typeemployes[i], $scope.typeEmployeSelectionne) == -1) {
                promise = MutuelleTypeEmploye.deleteByMutuelleSanteAndTypeEmploye({
                    mutuelle: mutuelleSante.id,
                    typeemploye: mutuelleSante.typeemployes[i].id
                });
                req_tab.push(promise);
            }

        }
        $q.all(req_tab).then(function () {
            ;
            $scope.typeEmployeSelectionne = [];
            $scope.mutuelle = {id: ""};
            $scope.findAll();
            $scope.toggle();
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            $('.choixTypeEmploye').removeAttr("checked");

        }, function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

    $scope.edit = function (item) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        MutuelleSante.edit(item).success(function () {
            $scope.editMutuelleTypeEmploye(item);
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };
    $scope.findAll();

    $scope.setCurrent = function (mutuelle) {
        $scope.mutuelle = mutuelle;
        $('.edit').attr('disabled', 'disabled');
        $scope.toggle();
    };
    $scope.annuler = function () {

        $('.btn').removeAttr('disabled');
        $('form').trigger("reset");
        $scope.toggle();
    };
    $scope.delete = function (item) {
        var req_tab = [];
        var promise;
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        /*Enlever d'abord les entrees de la table de jointure : mutuellesantetypeemploye*/
                        for (var i = 0; i < item.typeemployes.length; i++) {
                            promise = MutuelleTypeEmploye.deleteByMutuelleSanteAndTypeEmploye({
                                mutuelle: item.id,
                                typeemploye: item.typeemployes[i].id
                            });
                            req_tab.push(promise);

                        }
                        $q.all(req_tab).then(function () {
                            console.log("good mu san")
                            /*Supprimer l'element de la table mutuellesante*/
                            MutuelleSante.delete(item.id).success(function () {
                                SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                                $scope.findAll();
                            }).error(function () {
                                SweetAlert.simpleNotification("error", "Erreur", "Echec de la supression");
                            });

                        }, function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                        });

                    }
                });

    };


});
