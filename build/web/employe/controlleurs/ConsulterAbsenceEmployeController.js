/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').controller('ConsulterAbsenceEmployeController', function ($scope, $rootScope,
         SweetAlert, Absence)
{
    
    $scope.allAbsencesAcceptees = [];
    $scope.absencesRefusees = [];
    $scope.absencesEnCours = [];
    
    $scope.getAbsence = function () {
        Absence.findByEmploye($rootScope.idEmploye).success(function (data) {
            $scope.absences = data;
            if (data) {
                $scope.allAbsencesAcceptees = $scope.absences.filter(retrieveDemandesAcceptees);
                $scope.absencesRefusees = $scope.absences.filter(retrieveDemandesRefusees);
                $scope.absencesEnCours = $scope.absences.filter(retrieveDemandesEnCours);
            }
            $scope.validerCritereDate();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés !");
        });
    };
    $scope.getAbsence();
    
     function retrieveDemandesAcceptees(data) {
        return data.etatTraitement == 1;
    }

    function retrieveDemandesRefusees(data) {
        return data.etatTraitement == -1;
    }

    function retrieveDemandesEnCours(data) {
        return data.etatTraitement == 0;
    }
    
//    $scope.deleteAbsence = function(absence){
//        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
//                .then(function (value) {
//                    if (value == true) {
//                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
//                        Absence.delete(absence.id).success(function () {
//                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
//                            $scope.getAbsence();
//                        }).error(function () {
//                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
//                        });
//                    }
//                });
//    };
    
    /*FILTRE DEBUT ABSENCE*/

    /*Initialisation date et formatage*/
    var today = new Date();
    var dMin, dMax, d;

    $scope.setDefaultInterval = function () {
        var month = today.getMonth();
        var year = today.getFullYear();

        $scope.dateMin = new Date(year, today.getMonth(), 1);
        $scope.dateMax = new Date(year, month + 1, 0);
        $scope.dateFournie = today;

    };
    $scope.setDefaultInterval();

    $scope.recupererChaineDate = function () {
        dMin = $scope.dateMin.getFullYear() + "-" + ($scope.dateMin.getMonth() + 1) + "-" + $scope.dateMin.getDate();
        dMax = $scope.dateMax.getFullYear() + "-" + ($scope.dateMax.getMonth() + 1) + "-" + $scope.dateMax.getDate();
        d = $scope.dateFournie.getFullYear() + "-" + ($scope.dateFournie.getMonth() + 1) + "-" + $scope.dateFournie.getDate();
    };

    /*Initialisation date et formatage*/

    $scope.getDateOn = function () {
        $scope.absencesAcceptees = $scope.allAbsencesAcceptees.filter(retrieveDateOn);
    };
    $scope.getDateBefore = function () {
        $scope.absencesAcceptees = $scope.allAbsencesAcceptees.filter(retrieveDateBefore);
    };
    $scope.getDateAfter = function () {
        $scope.absencesAcceptees = $scope.allAbsencesAcceptees.filter(retrieveDateAfter);
    };
    $scope.getDateBetween = function () {
        $scope.absencesAcceptees = $scope.allAbsencesAcceptees.filter(retrieveDateBetween);
    };

    function retrieveDateOn(data) {
        var dpa = ($scope.typeDate == "debut") ? new Date(data.dateDebut) : new Date(data.dateFin);
        var da = new Date(d);
        return dpa.toDateString() == da.toDateString();
    }

    function retrieveDateBefore(data) {
        var dpa = ($scope.typeDate == "debut") ? new Date(data.dateDebut) : new Date(data.dateFin);
        var da = new Date(d);
        return dpa < da;
    }

    function retrieveDateAfter(data) {
        var dpa = ($scope.typeDate == "debut") ? new Date(data.dateDebut) : new Date(data.dateFin);
        var da = new Date(d);
        return dpa > da;
    }

    function retrieveDateBetween(data) {
        var dpa = ($scope.typeDate == "debut") ? new Date(data.dateDebut) : new Date(data.dateFin);
        var daMin = new Date(dMin);
        var daMax = new Date(dMax);
        return (dpa > daMin && dpa < daMax);
    }

    /*CRITERES FILTRE DATE DEBUT ABSENCE*/


    $scope.position = "before";
    $scope.intervalle = false;
    $scope.typeDate = "debut";

    $scope.definirCritere = function () {

        if ($scope.position == "between") {
            $scope.intervalle = true;
        } else {
            $scope.intervalle = false;
        }
    };

    $scope.validerCritereDate = function () {
        $scope.recupererChaineDate();

        if ($scope.position == "between") {
            $scope.getDateBetween();
        }
        if ($scope.position == "on") {
            $scope.getDateOn();
        }
        if ($scope.position == "before") {
            $scope.getDateBefore();
        }
        if ($scope.position == "after") {
            $scope.getDateAfter();
        }

    };

});


