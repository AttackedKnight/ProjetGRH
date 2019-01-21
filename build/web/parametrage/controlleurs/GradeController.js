/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').controller('GradeController', function ($scope, $q, SweetAlert, TypeEmploye, GradeTypeEmploye,
        Grade, Classe, Corps, Avancement, Echelon, Niveau, Categorie) {


    $scope.typeEmployeSelectionne = [];

    $scope.initialiserGrade = function () {
        $scope.lignes = [];
        $scope.lignes.push({id: ""});
        
        $scope.corpsChecked = false;
        $scope.classeChecked = false;
        $scope.niveauChecked = false;
        $scope.categorieChecked = false;
        $scope.echelonChecked = false;
        
    };
    $scope.initialiserGrade();
    
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

    TypeEmploye.findAll().success(function (data) {
        $scope.typeemployes = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types d'employés");
    });

    Avancement.findAll().success(function (data) {
        $scope.typeavancements = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types d'avancements !");
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
        if ($scope.editForm == true) {
            $scope.typeEmployeSelectionne = angular.copy($scope.lignes[0].typeemployes);
        }

    };

    $scope.controlForm = function () {

        var validite = true;
        
        /*Verifier qu'il y a au moins un type d'employe selectionne*/
        if($scope.typeEmployeSelectionne.length == 0){
            $(".selectionTypeEmploye").show("slow").delay(3000).hide("slow");
            validite = false;
            
        }
        
        /*Verifier qu'il y a au moins un element de grade selectionne*/
        if($scope.corpsChecked==false && $scope.classeChecked==false && $scope.categorieChecked==false
                && $scope.niveauChecked==false && $scope.echelonChecked==false){
            $(".selectionElementGrade").show("slow").delay(3000).hide("slow");
            validite = false;
        }
        
        
        /*Verifier pour le(s) element(s) de grade selectionne(s), la valeur n'est pas nulle*/
        if ($scope.createForm == true) {
            for (var i = 0; i < $scope.lignes.length; i++) {
                if ($scope.corpsChecked && $scope.lignes[i].corps == null) {
                    $(".corps").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                    validite = false;
                }
                if ($scope.classeChecked && $scope.lignes[i].classe == null) {
                    $(".classe").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                    validite = false;
                }
                if ($scope.echelonChecked && $scope.lignes[i].echelon == null) {
                    $(".echelon").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                    validite = false;
                }
                if ($scope.categorieChecked && $scope.lignes[i].categorie == null) {
                    $(".categorie").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                    validite = false;
                }
                if ($scope.niveauChecked && $scope.lignes[i].niveau == null) {
                    $(".niveau").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                    validite = false;
                }

                if ($scope.lignes[i].typeAvancement == null) {
                    $(".typeAvancement").eq(i).parent().next().show("slow").delay(3000).hide("slow");
                    validite = false;
                }
            }

        }

        $('#GradeForm input').each(function (e) {   //Verification des champs de type input
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

    $scope.addGradeTypeEmploye = function (grades) {
        var promise;
        var req_tab = [];
        for (var i = 0; i < $scope.typeEmployeSelectionne.length; i++) {
            for (var j = 0; j < grades.length; j++) {
                promise = GradeTypeEmploye.add({
                    id: "",
                    grade: grades[j],
                    typeEmploye: $scope.typeEmployeSelectionne[i]
                });
                req_tab.push(promise);
            }

        }

        $q.all(req_tab).then(function () {
            $scope.typeEmployeSelectionne = [];
            $scope.findAll();
            $scope.initialiserGrade();
            SweetAlert.simpleNotification("success", "Succes", "Grade ajout� avec succes");
            $('.choixTypeEmploye').removeAttr("checked");


        });
    };

    $scope.getTypeEmployeGrade = function () {
        var promise;
        var req_tab = [];

        for (var i = 0; i < $scope.grades.length; i++) {
            promise = GradeTypeEmploye.findByGrade($scope.grades[i].id);
            req_tab.push(promise);
        }

        $q.all(req_tab).then(function (results) {
            for (var i = 0; i < $scope.grades.length; i++) {
                if (results[i].data) {
                    $scope.grades[i].typeemployes = results[i].data;
                } else {
                    $scope.grades[i].typeemployes = [];
                }
            }
            SweetAlert.finirChargementSucces("Chargement complet !");
        }, function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des types d'employés");
        });
    };


    $scope.add = function (l) {
        var req_tab = [];
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        for (var i = 0; i < l.length; i++) {
            req_tab.push(Grade.add(l[i]));
        }
        $q.all(req_tab).then(function (result) {
            $scope.findLast(l.length);
        });
    };

    $scope.findLast = function (nombreDeLignes) {   //Recup�rqtion des lignes(entr�es) nouvellement ajout�es dans la table grade
        Grade.findLast(nombreDeLignes).success(function (data) {
            $scope.addGradeTypeEmploye(data);
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur lors de la recupération des grades ajoutés !");
        });
    }

    $scope.findAll = function () {

        Grade.findAll().success(function (data) {          
            $scope.grades = data;
            $scope.getTypeEmployeGrade();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des grades !");
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


    $scope.editGradeTypeEmploye = function (grade) {

        var promise;
        var req_tab = [];

        /*LA MISE A JOUR DANS LA TABLE DE JOINTURE "gradetypeemplye" consistera a :
         * 
         * -->supprimer une ou (des) entree(s) dans cette table s'il y a de(s) elements deselectionnes
         * 
         * -->ajouter une ou (des) entree(s) dans cette table s'il y a de(s) nouvelle(s) selection
         * */

        /*Verifier s 'il y a de new elements*/
        for (var i = 0; i < $scope.typeEmployeSelectionne.length; i++) {
            if ($scope.chercherTypeEmploye($scope.typeEmployeSelectionne[i], grade.typeemployes) == -1)
            {
                promise = GradeTypeEmploye.add({
                    id: "",
                    grade: grade,
                    typeEmploye: $scope.typeEmployeSelectionne[i]
                });
                req_tab.push(promise);
            }

        }
        /*Verifier s 'il y a deS element(s) qui ne figurent plus sur la nouvelle liste*/
        for (var i = 0; i < grade.typeemployes.length; i++) {
            if ($scope.chercherTypeEmploye(grade.typeemployes[i], $scope.typeEmployeSelectionne) == -1) {
                promise = GradeTypeEmploye.deleteByGradeAndTypeEmploye({
                    grade: grade.id,
                    typeemploye: grade.typeemployes[i].id
                });
                req_tab.push(promise);
            }

        }
        $q.all(req_tab).then(function () {
            ;
            $scope.typeEmployeSelectionne = [];
            $scope.findAll();
            $scope.initialiserGrade();
            $scope.toggle();
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            $('.choixTypeEmploye').removeAttr("checked");

        }, function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

    $scope.edit = function (item) {

        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Grade.edit(item).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            $scope.editGradeTypeEmploye(item);
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

    $scope.findAll();

    $scope.setCurrent = function (grade) {
        $scope.initialiserGrade();
        $scope.lignes[0] = grade;

        $scope.corpsChecked = (grade.corps) ? true : false;
        $scope.classeChecked = (grade.classe) ? true : false;
        $scope.niveauChecked = (grade.niveau) ? true : false;
        $scope.categorieChecked = (grade.categorie) ? true : false;
        $scope.echelonChecked = (grade.echelon) ? true : false;
        
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
        var req_tab = [];
        var promise;
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");

                        /*Enlever d'abord les entrees de la table de jointure : gradetypeemploye*/
                        for (var i = 0; i < item.typeemployes.length; i++) {
                            promise = GradeTypeEmploye.deleteByGradeAndTypeEmploye({
                                grade: item.id,
                                typeemploye: item.typeemployes[i].id
                            });
                            req_tab.push(promise);

                        }
                        
                        $q.all(req_tab).then(function () {
                            /*Supprimer l'element de la table grade*/
                            Grade.delete(item.id).success(function () {
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
