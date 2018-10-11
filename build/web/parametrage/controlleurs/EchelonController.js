/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('ParametrageModule').controller('EchelonController', function ($scope, Securite, SweetAlert, Echelon) {

    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    $scope.echelons = [];
    $scope.echelon = {id: ""};

    $scope.editForm = false;
    $scope.createForm = true;

    $scope.toggle = function () {
        $scope.editForm = !$scope.editForm;
        $scope.createForm = !$scope.createForm;
    };

    $scope.controlForm = function (c) {
        if (c.libelle == null || c.libelle == "") {
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        } else {
            if ($scope.createForm == true) {
                $scope.add(c);
            } else {
                $scope.edit(c);
            }
        }
    };

    $scope.add = function (c) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Echelon.add(c).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Echelon ajouté avec succes");
            $scope.findAll();
            $scope.echelon = {id: ""};
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "L'échelon n'a pas pu etre ajouté");
        });
    };

    $scope.findAll = function () {

        Echelon.findAll().success(function (data) {
            SweetAlert.finirChargementSucces("Chargement complet !");
            $scope.echelons = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des échelons !");
        });
    };

    $scope.findAll();

    $scope.edit = function (item) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Echelon.edit(item).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            $scope.findAll();
            $scope.echelon = {id: ""};
            $scope.toggle();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };
    $scope.findAll();

    $scope.setCurrent = function (echelon) {
        $scope.echelon = echelon;
        $('.edit').attr('disabled', 'disabled');
        $scope.toggle();
    };
    $scope.annuler = function () {

        $('.btn').removeAttr('disabled');
        $('form').trigger("reset");
        $scope.toggle();
    };
    $scope.delete = function (item) {
        
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        Echelon.delete(item.id).success(function () {
                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                            $scope.findAll();
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la supression");
                        });
                    }
                });


    };






});

