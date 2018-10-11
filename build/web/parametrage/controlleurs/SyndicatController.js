/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('SyndicatController', function ($scope, Securite, SweetAlert, Syndicat, $q, SyndicatTypeEmploye, TypeEmploye) {

    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    $scope.syndicats = [];
    $scope.syndicat = {id: ""};
    $scope.typeEmployeSelectionne = [];

    $scope.editForm = false;
    $scope.createForm = true;


    $scope.toggle = function () {
        $scope.editForm = !$scope.editForm;
        $scope.createForm = !$scope.createForm;
        if ($scope.editForm == true) {
            $scope.typeEmployeSelectionne = angular.copy($scope.syndicat.typeemployes);
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
            if (c.nomSyndicat == null || c.nomSyndicat == "") {
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

    $scope.addSyndicatTypeEmploye = function (syndicat) {
        var promise;
        var req_tab = [];
        for (var i = 0; i < $scope.typeEmployeSelectionne.length; i++) {
            promise = SyndicatTypeEmploye.add({
                id: "",
                syndicat: syndicat,
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

    $scope.findByLibelle = function (nomSyndicat) {
        Syndicat.findByLibelle(nomSyndicat).success(function (data) {
            $scope.addSyndicatTypeEmploye(data);
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le syndicat n'a pas pu etre recupéré");
        });
    };

    /*RECUPERER LE(S) TYPE(S) D'EMPLOYE ASSOCIE(S) A CHAQUE SYNDICAT*/
    $scope.getTypeEmployeSyndicat = function () {
        var promise;
        var req_tab = [];

        for (var i = 0; i < $scope.syndicats.length; i++) {
            promise = SyndicatTypeEmploye.findBySyndicat($scope.syndicats[i].id);
            req_tab.push(promise);
        }

        $q.all(req_tab).then(function (results) {
            for (var i = 0; i < $scope.syndicats.length; i++) {
                if (results[i].data) {
                    $scope.syndicats[i].typeemployes = results[i].data;
                } else {
                    $scope.syndicats[i].typeemployes = [];
                }
            }
        },
                function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des types d'employés");
                });
    };

    $scope.chercherTypeEmploye = function (el, tab) {

        for (var j = 0; j < tab.length; j++) {
            if (tab[j].id == el.id)
                return 1;
        }
        return -1;
    }

    $scope.editSyndicatTypeEmploye = function (syndicat) {

        var promise;
        var req_tab = [];

        /*LA MISE A JOUR DANS LA TABLE DE JOINTURE "syndicatsociletypeemplye" consistera a :
         * 
         * -->supprimer une ou (des) entree(s) dans cette table s'il y a de(s) elements deselectionnes
         * 
         * -->ajouter une ou (des) entree(s) dans cette table s'il y a de(s) nouvelle(s) selection
         * */

        /*Verifier s 'il y a de new elements*/
        for (var i = 0; i < $scope.typeEmployeSelectionne.length; i++) {
            if ($scope.chercherTypeEmploye($scope.typeEmployeSelectionne[i], syndicat.typeemployes) == -1)
            {
                promise = SyndicatTypeEmploye.add({
                    id: "",
                    syndicat: syndicat,
                    typeEmploye: $scope.typeEmployeSelectionne[i]
                });
                req_tab.push(promise);
            }

        }
        /*Verifier s 'il y a deS element(s) qui ne figurent plus sur la nouvelle liste*/
        for (var i = 0; i < syndicat.typeemployes.length; i++) {
            if ($scope.chercherTypeEmploye(syndicat.typeemployes[i], $scope.typeEmployeSelectionne) == -1) {
                promise = SyndicatTypeEmploye.deleteBySyndicatAndTypeEmploye({
                    syndicat: syndicat.id,
                    typeemploye: syndicat.typeemployes[i].id
                });
                req_tab.push(promise);
            }

        }
        $q.all(req_tab).then(function () {
            ;
            $scope.typeEmployeSelectionne = [];
            $scope.syndicat = {id: ""};
            $scope.findAll();
            $scope.toggle();
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            $('.choixTypeEmploye').removeAttr("checked");

        }, function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

    $scope.add = function (s) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Syndicat.add(s).success(function () {
            $scope.findByLibelle(s.nomSyndicat);
            $scope.syndicat = {id: ""};
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le syndicat n'a pas pu etre ajouté");
        });
    };

    $scope.findAll = function () {
        Syndicat.findAll().success(function (data) {
            SweetAlert.finirChargementSucces("Chargement complet !");
            $scope.syndicats = data;
            $scope.getTypeEmployeSyndicat();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des syndicats !");
        });
    };

    $scope.findAll();

    $scope.edit = function (item) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Syndicat.edit(item).success(function () {
            $scope.editSyndicatTypeEmploye(item);
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };
    $scope.findAll();

    $scope.setCurrent = function (syndicat) {
        $scope.syndicat = syndicat;
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
                        /*Enlever d'abord les entrees de la table de jointure : syndicattypeemploye*/
                        for (var i = 0; i < item.typeemployes.length; i++) {
                            promise = SyndicatTypeEmploye.deleteBySyndicatAndTypeEmploye({
                                syndicat: item.id,
                                typeemploye: item.typeemployes[i].id
                            });
                            req_tab.push(promise);

                        }
                        $q.all(req_tab).then(function () {
                            /*Supprimer l'element de la table syndicat*/
                            Syndicat.delete(item.id).success(function () {
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
