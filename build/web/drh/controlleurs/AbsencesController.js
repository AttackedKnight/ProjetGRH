/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').controller('AbsencesController', function ($scope, SweetAlert,Absence)
{
   $scope.allAbsencesAcceptees = [];
    $scope.absencesRefusees = [];
    $scope.absencesEnCours = [];
    
    $scope.getAbsence = function () {
        Absence.findAbsenceAccepteByEmploye($scope.$parent.employe.id).success(function (data) {
            $scope.absences = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés !");
        });
    };
    $scope.getAbsence();
    
   

    function retrieveDemandesRefusees(data) {
        return data.etatTraitement == -1;
    }

    
    $scope.deleteAbsence = function(absence){
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        Absence.delete(absence.id).success(function () {
                            SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                            $scope.getAbsence();
                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                        });
                    }
                });
    };
    
   

});