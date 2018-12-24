/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ServiceModule').controller('ConsulterAbsenceController', function ($scope, $rootScope, Entite,
        SweetAlert, Absence)
{

    $scope.getEntites = function () {
        Entite.findAll().success(function (data) {
            $scope.entites = data;
            $scope.getEntitesFille();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des entites !");
        });
    };
    $scope.getEntites();
    $scope.getEntitesFille = function () {
        $scope.IdFilles = [];
        for (var i = 0; i < $scope.entites.length; i++) {
            if ($scope.estEnfant($scope.entites[i], $rootScope.entiteUtilisateur) == true) {
                $scope.IdFilles.push($scope.entites[i].id);
            }
        }

        $scope.getAbsence();
    };
    /*Le principe consisite a remonte les parent de l'entite en question
     * 
     * pour voir si on vas tomber sur l'entite parent indique en second parametre */
    $scope.estEnfant = function (entite, parent) {
        var e = entite;
        var b = false;
        while (e != null) {
            if (e.id == parent.id) {
                b = true;
                break;
            }
            e = e.entite;
        }
        return b;
    };

    $scope.getAbsence = function () {
        Absence.findByEntite($scope.IdFilles.join("-")).success(function (data) {
            $scope.absences = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés !");
        });
    };
    
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


