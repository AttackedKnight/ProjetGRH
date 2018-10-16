/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('ParametrageModule').controller('EntiteController', function ($scope, SweetAlert,
Entite, TypeEntite) {


    $scope.entites = [];
    $scope.entite = {id: ""};


    TypeEntite.findAll().success(function (data) {
        $scope.typeentites = data;
    }).error(function () {
        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la r�cup�ration des types d'entités");
    });

    $scope.controlForm = function (c) {
        if (c.nom == null || c.nom == "") {
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        } else {
            if (c.adresse == null || c.adresse == "") {
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            } else {
                if (c.telephone == null || c.telephone == "") {
                    $("div.requis").eq(2).show("slow").delay(3000).hide("slow");
                } else {
                    if (c.email == null || c.email == "") {
                        $("div.requis").eq(3).show("slow").delay(3000).hide("slow");
                    } else {
                        if (c.typeEntite == null) {
                            $("div.requis").eq(4).show("slow").delay(3000).hide("slow");
                        } else {
                            $scope.add(c);
                        }

                    }
                }
            }
        }

    };

    $scope.add = function (c) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Entite.add(c).success(function () {
            SweetAlert.notificationAvecSuggestion("success", "Succes", "Entité ajoutée avec succes",
                    "<h5><i>Clicker <a href='#/parametrage/entite/show'>ici</a> pour voir le(s) entité(s)</i><h5>");
            $scope.findAll();
            $scope.entite = {id: ""};
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "L'entité n'a pas pu etre créée");
        });
    };

    $scope.findAll = function () {

        Entite.findAll().success(function (data) {
            SweetAlert.finirChargementSucces("Chargement complet !");
            $scope.entites = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des entités !");
        });
    };

    $scope.findAll();




    $scope.delete = function (item) {

        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        Entite.delete(item.id).success(function () {
                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                            $scope.findAll();
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la supression");
                        });
                    }
                });
                



    };

});

