/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('ParametrageModule').controller('FonctionController', function ($scope, Securite, Fonction, SweetAlert) {

    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }

    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    $scope.fonctions = [];
    $scope.fonction = {id: ""};

    $scope.editForm = false;
    $scope.createForm = true;

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
        Fonction.add(c).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Fonction ajoutée avec succes");
            $scope.findAll();
            $scope.fonction = {id: ""};
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "La fonction n'a pas pu etre ajoutée");
        });
    };


    $scope.findAll = function () {
        Fonction.findAll().success(function (data) {
            $scope.fonctions = data;
            SweetAlert.finirChargementSucces("Chargement complet !");

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des fonctions !");
        });
    };

    $scope.findAll();

    $scope.edit = function (item) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Fonction.edit(item).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            $scope.findAll();
            $scope.fonction = {id: ""};
            $scope.toggle();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

    $scope.setCurrent = function (fonction) {
        $scope.fonction = fonction;
        $('.edit').attr('disabled', 'disabled');
        $scope.toggle();
    };
    $scope.annuler = function () {

        $('.btn').removeAttr('disabled');
        $('form').trigger("reset");
        $scope.toggle();
    };


    $scope.toggle = function () {
        $scope.editForm = !$scope.editForm;
        $scope.createForm = !$scope.createForm;
    };

    $scope.delete = function (item) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        Fonction.delete(item.id).success(function () {
                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                            $scope.findAll();
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la supression");
                        });
                    }
                });
    };

});

