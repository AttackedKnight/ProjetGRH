/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('ParametrageModule').controller('CaisseSocialeController', function ($scope, Securite, SweetAlert, $q, CaisseSociale, TypeEmploye, CaisseSocialeTypeEmploye) {

    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    $scope.caissesociales = [];
    $scope.caissesociale = {id: ""};
    $scope.typeEmployeSelectionne = [];

    $scope.editForm = false;
    $scope.createForm = true;

    $scope.toggle = function () {
        $scope.editForm = !$scope.editForm;
        $scope.createForm = !$scope.createForm;
        if ($scope.editForm == true) {
            $scope.typeEmployeSelectionne = angular.copy($scope.caissesociale.typeemployes);
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
            if (c.libelle == null || c.libelle == "") {
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

    $scope.addCaisseSocialeTypeEmploye = function (caisseSociale) {
        var promise;
        var req_tab = [];
        for (var i = 0; i < $scope.typeEmployeSelectionne.length; i++) {
            promise = CaisseSocialeTypeEmploye.add({
                id: "",
                caisseSociale: caisseSociale,
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



    $scope.add = function (c) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        CaisseSociale.add(c).success(function () {
            $scope.findByLibelle(c.libelle);
            $scope.caissesociale = {id: ""};
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "La caisse sociale n'a pas pu etre ajouté");
        });
    };

    $scope.findByLibelle = function (libelle) {
        CaisseSociale.findByLibelle(libelle).success(function (data) {
            $scope.addCaisseSocialeTypeEmploye(data);
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "La caisse sociale n'a pas pu etre récuperer");
        });
    };

    /*RECUPERER LE(S) TYPE(S) D'EMPLOYE ASSOCIE(S) A CHAQUE CAISSE SOCIALE*/
    $scope.getTypeEmployeCaisseSociale = function () {
        var promise;
        var req_tab = [];

        for (var i = 0; i < $scope.caissesociales.length; i++) {
            promise = CaisseSocialeTypeEmploye.findByCaisseSociale($scope.caissesociales[i].id);
            req_tab.push(promise);
        }

        $q.all(req_tab).then(function (results) {
            for (var i = 0; i < $scope.caissesociales.length; i++) {
                if (results[i].data) {
                    $scope.caissesociales[i].typeemployes = results[i].data;
                } else {
                    $scope.caissesociales[i].typeemployes = [];
                }
            }
            SweetAlert.finirChargementSucces("Chargement complet !");
        }, function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération des types d'employe");
        });
    };

    $scope.findAll = function () {

        CaisseSociale.findAll().success(function (data) {
            $scope.caissesociales = data;
            $scope.getTypeEmployeCaisseSociale();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des caisses sociales !");
        });
    };

    $scope.findAll();

    $scope.chercherTypeEmploye = function (el, tab) {

        for (var j = 0; j < tab.length; j++) {
            if (tab[j].id == el.id)
                return 1;
        }
        return -1;
    };

    $scope.editCaisseSocialeTypeEmploye = function (caisseSociale) {

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
            if ($scope.chercherTypeEmploye($scope.typeEmployeSelectionne[i], caisseSociale.typeemployes) == -1)
            {
                promise = CaisseSocialeTypeEmploye.add({
                    id: "",
                    caisseSociale: caisseSociale,
                    typeEmploye: $scope.typeEmployeSelectionne[i]
                });
                req_tab.push(promise);
            }

        }
        /*Verifier s 'il y a deS element(s) qui ne figurent plus sur la nouvelle liste*/
        for (var i = 0; i < caisseSociale.typeemployes.length; i++) {
            if ($scope.chercherTypeEmploye(caisseSociale.typeemployes[i], $scope.typeEmployeSelectionne) == -1) {
                promise = CaisseSocialeTypeEmploye.deleteByCaisseSocialeAndTypeEmploye({
                    caisse: caisseSociale.id,
                    typeemploye: caisseSociale.typeemployes[i].id
                });
                req_tab.push(promise);
            }

        }
        $q.all(req_tab).then(function () {
            ;
            $scope.typeEmployeSelectionne = [];
            $scope.caissesociale = {id: ""};
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
        CaisseSociale.edit(item).success(function () {
            $scope.editCaisseSocialeTypeEmploye(item);
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };
    $scope.findAll();

    $scope.setCurrent = function (caissesociale) {
        $scope.caissesociale = caissesociale;
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

                        /*Enlever d'abord les entrees de la table de jointure : caissesocialetypeemploye*/
                        for (var i = 0; i < item.typeemployes.length; i++) {
                            promise = CaisseSocialeTypeEmploye.deleteByCaisseSocialeAndTypeEmploye({
                                caisse: item.id,
                                typeemploye: item.typeemployes[i].id
                            });
                            req_tab.push(promise);

                        }
                        $q.all(req_tab).then(function () {

                            /*Supprimer l'element de la table caissesociale*/
                            CaisseSociale.delete(item.id).success(function () {
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

