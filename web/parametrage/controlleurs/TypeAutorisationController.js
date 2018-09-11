/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('TypeAutorisationController', function ($scope, Securite, SweetAlert, TypeAutorisation) {


    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    $scope.typeautorisations = [];
    $scope.typeautorisation = {id: ""};

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

    $scope.add = function (s) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        TypeAutorisation.add(s).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Type d'autorisation ajouté avec succes");
            $scope.findAll();
            $scope.typeautorisation = {id: ""};
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le type d'autorisation  n'a pas pu etre ajouté");
        });
    };

    $scope.findAll = function () {
        TypeAutorisation.findAll().success(function (data) {
            SweetAlert.finirChargementSucces("Chargement complet !");
            $scope.typeautorisations = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des types d'autorisation !");
        });
    };

    $scope.findAll();

    $scope.edit = function (item) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        TypeAutorisation.edit(item).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            $scope.findAll();
            $scope.typeautorisation = {id: ""};
            $scope.toggle();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };
    $scope.findAll();

    $scope.setCurrent = function (ta) {
        $scope.typeautorisation = ta;
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
                        TypeAutorisation.delete(item.id).success(function () {
                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                            $scope.findAll();
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la supression");
                        });
                    }
                });
                

    };

});
