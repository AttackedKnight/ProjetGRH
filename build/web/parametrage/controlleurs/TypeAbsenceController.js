/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('TypeAbsenceController', function ($scope, 
SweetAlert, TypeEmploye, $q, Typeabsence, AbsenceTypeEmploye) {



    $scope.typeAbsences = [];
    $scope.typeAbsence = {id: ""};
    $scope.typeEmployeSelectionne = [];

    $scope.editForm = false;
    $scope.createForm = true;

    $scope.toggle = function () {
        $scope.editForm = !$scope.editForm;
        $scope.createForm = !$scope.createForm;
        if ($scope.editForm == true) {
            $scope.typeEmployeSelectionne = angular.copy($scope.typeAbsence.typeemployes);
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

    $scope.addAbsenceTypeEmploye = function (typeAbsence) {
        
        var promise;
        var req_tab = [];
        for (var i = 0; i < $scope.typeEmployeSelectionne.length; i++) {
            promise = AbsenceTypeEmploye.add({
                id: "",
                typeAbsence: typeAbsence,
                typeEmploye: $scope.typeEmployeSelectionne[i]
            });
            req_tab.push(promise);
        }
console.log(req_tab);
        $q.all(req_tab).then(function () {
            $scope.typeEmployeSelectionne = [];
            $scope.findAll();
            SweetAlert.simpleNotification("success", "Succes", "Ajout effectué avec succes");
            $('.choixTypeEmploye').removeAttr("checked");


        });
    };

    /*RECUPERER LE(S) TYPE(S) D'EMPLOYE ASSOCIE(S) AU MUTUELLE*/
    $scope.getTypeEmployeAbsence = function () {
        var promise;
        var req_tab = [];

        for (var i = 0; i < $scope.typeAbsences.length; i++) {
            promise = AbsenceTypeEmploye.findByAbsence($scope.typeAbsences[i].id);
            req_tab.push(promise);
        }

        $q.all(req_tab).then(function (results) {
            for (var i = 0; i < $scope.typeAbsences.length; i++) {
                if (results[i].data) {
                    $scope.typeAbsences[i].typeemployes = results[i].data;
                } else {
                    $scope.typeAbsences[i].typeemployes = [];
                }
            }
        },
                function () {
                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des types d'employés");
                });
    };

    $scope.findByLibelle = function (libelle) {
        Typeabsence.findByLibelle(libelle).success(function (data) {
            console.log(data);
            $scope.addAbsenceTypeEmploye(data);
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "L'absence n'a pas pu etre recupéré");
        });
    };

    $scope.add = function (s) {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Typeabsence.add(s).success(function () {
            $scope.findByLibelle(s.libelle);
            $scope.typeAbsence = {id: ""};
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "L'absence n'a pas pu etre ajouté");
        });
    };

    $scope.findAll = function () {
        Typeabsence.findAll().success(function (data) {
            SweetAlert.finirChargementSucces("Chargement complet !");
            $scope.typeAbsences = data;
            $scope.getTypeEmployeAbsence();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des types d'absences !");
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

    $scope.editAbsenceTypeEmploye = function (typeAbsence) {

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
            if ($scope.chercherTypeEmploye($scope.typeEmployeSelectionne[i], typeAbsence.typeemployes) == -1)
            {
                promise = AbsenceTypeEmploye.add({
                    id: "",
                    typeAbsence: typeAbsence,
                    typeEmploye: $scope.typeEmployeSelectionne[i]
                });
                req_tab.push(promise);
            }

        }
        /*Verifier s 'il y a deS element(s) qui ne figurent plus sur la nouvelle liste*/
        for (var i = 0; i < typeAbsence.typeemployes.length; i++) {
            if ($scope.chercherTypeEmploye(typeAbsence.typeemployes[i], $scope.typeEmployeSelectionne) == -1) {
                promise = AbsenceTypeEmploye.deleteByAbsenceAndTypeEmploye({
                    typeAbsence: typeAbsence.id,
                    typeemploye: typeAbsence.typeemployes[i].id
                });
                req_tab.push(promise);
            }

        }
        $q.all(req_tab).then(function () {
            ;
            $scope.typeEmployeSelectionne = [];
            $scope.typeAbsence = {id: ""};
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
        Typeabsence.edit(item).success(function () {
            $scope.editAbsenceTypeEmploye(item);
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };
    $scope.findAll();

    $scope.setCurrent = function (typeAbsence) {
        $scope.typeAbsence = typeAbsence;
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
                        /*Enlever d'abord les entrees de la table de jointure : absencetypeemploye*/
                        for (var i = 0; i < item.typeemployes.length; i++) {
                            promise = AbsenceTypeEmploye.deleteByAbsenceAndTypeEmploye({
                                typeAbsence: item.id,
                                typeemploye: item.typeemployes[i].id
                            });
                           
                            req_tab.push(promise);
                             console.log(req_tab);
                        }
                        $q.all(req_tab).then(function () {
                            console.log("good mu san");
                            /*Supprimer l'element de la table absencesante*/
                            Typeabsence.delete(item.id).success(function () {
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
