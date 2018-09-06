/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('GradeController', function ($scope, $q, Securite, SweetAlert,
        Grade, Classe, Corps, Avancement, Echelon, Niveau, Categorie) {

    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    $scope.initialiserGrade = function () {
        $scope.lignes = [];
        $scope.lignes.push({id: ""});
    };
    $scope.initialiserGrade();

    $scope.typeGrade = "pats";

    $scope.changerTypeGrade = function () {

        $scope.initialiserGrade();
        $scope.nouvelleLigne = true;
    };


    $scope.nouvelleLigne = true;
    $scope.ajouterLigne = function () {

        if ($scope.lignes.length == 4) {
            $scope.nouvelleLigne = false;
        } else {
            $scope.lignes.push({id: ""});
        }
    };

    $scope.classes = [];
    $scope.categories = [];
    $scope.corps = [];
    $scope.niveaux = [];
    $scope.echelons = [];
    $scope.typeavancements = [];

    Avancement.findAll().success(function (data) {
        $scope.typeavancements = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types d'avancement !");
    });

    Corps.findAll().success(function (data) {
        $scope.corps = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des corps !");
    });

    Classe.findAll().success(function (data) {
        $scope.classes = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des classes !");
    });

    Echelon.findAll().success(function (data) {
        $scope.echelons = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des échelons !");
    });

    Niveau.findAll().success(function (data) {
        $scope.niveaux = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des niveaux !");
    });


    Categorie.findAll().success(function (data) {
        $scope.categories = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des catégories !");
    });

    $scope.grades = [];

    $scope.editForm = false;
    $scope.createForm = true;



    $scope.toggle = function () {
        $scope.editForm = !$scope.editForm;
        $scope.createForm = !$scope.createForm;
        $scope.nouvelleLigne = !$scope.nouvelleLigne;

    };

    $scope.controlForm = function () {

        var validite = true;
        console.log($scope.lignes)
        if ($scope.createForm == true) {

            if ($scope.typeGrade == "per") {
                for (var i = 0; i < $scope.lignes.length; i++) {
                    if ($scope.lignes[i].corps == null) {
                        $(".corps").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite = false;
                    }
                    if ($scope.lignes[i].classe == null) {
                        $(".classe").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite = false;
                    }
                    if ($scope.lignes[i].echelon == null) {
                        $(".echelon").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite = false;
                    }
                }
            }
            if ($scope.typeGrade == "pats") {
                for (var i = 0; i < $scope.lignes.length; i++) {
                    if ($scope.lignes[i].classe == null) {
                        $(".classe").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite = false;
                    }
                    if ($scope.lignes[i].categorie == null) {
                        $(".categorie").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite = false;
                    }
                    if ($scope.lignes[i].niveau == null) {
                        $(".niveau").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite = false;
                    }
                    if ($scope.lignes[i].echelon == null) {
                        $(".echelon").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite = false;
                    }
                    if ($scope.lignes[i].typeAvancement == null) {
                        $(".typeAvancement").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                        validite = false;
                    }
                }

            }
        }

        $('#GradeForm input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });

        if (validite === true) {
            if ($scope.createForm == true) {
                $scope.add($scope.lignes);
            } else {
                $scope.edit($scope.lignes[0]);
            }
        }
    };

    $scope.add = function (l) {
        var req_tab = [];
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        for (var i = 0; i < l.length; i++) {
            req_tab.push(Grade.add(l[i]));
        }
        $q.all(req_tab).then(function (result) {
            SweetAlert.simpleNotification("success", "Succes", "Grade ajouté avec succes");
            $scope.findAll();
            $scope.initialiserGrade();

        });
    };

    $scope.findAll = function () {

        Grade.findAll().success(function (data) {
            SweetAlert.finirChargementSucces("Chargement complet !");
            $scope.grades = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des grades !");
        });
    };

    $scope.findAll();

    $scope.edit = function (item) {

        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Grade.edit(item).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            $scope.findAll();

            $scope.initialiserGrade();

            $scope.toggle();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

    $scope.findAll();

    $scope.setCurrent = function (grade) {
        $scope.initialiserGrade();
        $scope.lignes[0] = grade;
        if (!grade.corps || grade.corps == null) {
            $scope.typeGrade = "pats";
        } else {
            $scope.typeGrade = "per";
        }

        $('.edit').attr('disabled', 'disabled');
        $scope.toggle();
    };

    $scope.annuler = function () {

        $('.btn').removeAttr('disabled');
        $('form').trigger("reset");

        $scope.initialiserGrade();

        $scope.toggle();
    };
    $scope.delete = function (item) {

        bootbox.confirm({
            title: "Suppression !",
            message: "Voulez vous supprimer l'Ã©lement",
            buttons: {
                cancel: {
                    label: '<i class="fa fa-times"></i> Annuler'
                },
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirmer'
                }
            },
            callback: function (result) {
                if (result == true) {
                    var dialog = bootbox.dialog({
                        title: 'SUPPRESSION',
                        message: '<p><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i><span>Suppression ...</span></p>'
                    });

                    Grade.delete(item.id).success(function () {
                        dialog.modal('hide');
                        $scope.findAll();
                    }).error(function () {
                        dialog.find('.bootbox-body').html('<div class="alert alert-block alert-error"><i class="fa fa-3x fa-check" aria-hidden="true"></i>Une erreur est survenue</div>');
                    });

                }
            }


        });


    };

});
