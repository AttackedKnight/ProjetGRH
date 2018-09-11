/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('MutuelleSanteController', function ($scope, Securite, SweetAlert, MutuelleSante) {

    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    $scope.mutuelles = [];
    $scope.mutuelle = {id: ""};

    $scope.editForm = false;
    $scope.createForm = true;

    $scope.toggle = function () {
        $scope.editForm = !$scope.editForm;
        $scope.createForm = !$scope.createForm;
    };

    $scope.controlForm = function (c) {
        if (c.nom == null || c.nom == "") {
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        } else {
            if ($scope.createForm == true) {
                $scope.add(c);
            } else {
                $scope.edit(c);
            }
        }
    };

    $scope.add = function (s) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        MutuelleSante.add(s).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Mutuelle de sant� ajout� avec succes");
            $scope.findAll();
            $scope.mutuelle = {id: ""};
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le mutuelle de sant� n'a pas pu etre ajout�");
        });
    };

    $scope.findAll = function () {
        MutuelleSante.findAll().success(function (data) {
            SweetAlert.finirChargementSucces("Chargement complet !");
            $scope.mutuelles = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des mutuelles de sant� !");
        });
    };

    $scope.findAll();

    $scope.edit = function (item) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        MutuelleSante.edit(item).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectu�e avec succes");
            $scope.findAll();
            $scope.mutuelle = {id: ""};
            $scope.toggle();
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

        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet �l�ment ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        MutuelleSante.delete(item.id).success(function () {
                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectu�e avec succes");
                            $scope.findAll();
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la supression");
                        });
                    }
                });

    };


});
