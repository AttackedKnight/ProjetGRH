/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('TypeDocumentController', function ($scope, SweetAlert, Typedocument) {


    $scope.typedocuments = [];
    $scope.typedocument = {id: ""};

    $scope.editForm = false;
    $scope.createForm = true;

    $scope.toggle = function () {
        $scope.editForm = !$scope.editForm;
        $scope.createForm = !$scope.createForm;
    };


    $scope.controlForm = function (c) {
        if (c.code == null || c.code == "") {
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        } else {
            if (c.dureeArchivage == null || c.dureeArchivage == "") {
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            } else {
                if ($scope.createForm == true) {
                    $scope.add(c);
                } else {
                    $scope.edit(c);
                }
            }
        }
    };

    $scope.add = function (s) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Typedocument.add(s).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Type de document ajouté avec succes");
            $scope.findAll();
            $scope.typedocument = {id: ""};
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Le type de document n'a pas pu etre ajouté");
        });
    };

    $scope.findAll = function () {
        Typedocument.findAll().success(function (data) {
            SweetAlert.finirChargementSucces("Chargement complet !");
            $scope.typedocuments = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des types de documents !");
        });
    };

    $scope.findAll();

    $scope.edit = function (item) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Typedocument.edit(item).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            $scope.findAll();
            $scope.typedocument = {id: ""};
            $scope.toggle();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };
    $scope.findAll();

    $scope.setCurrent = function (typedocument) {
        $scope.typedocument = typedocument;
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
                        Typedocument.delete(item.id).success(function () {
                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectu�e avec succes");
                            $scope.findAll();
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la supression");
                        });
                    }
                });
                
    };


});

