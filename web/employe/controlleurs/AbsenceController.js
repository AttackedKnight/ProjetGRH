/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('EmployeModule').controller('AbsenceController', function ($scope,Typepermission,Absence,Employe,$rootScope,SweetAlert)
{

 
 $scope.absence = {id:"",etatTraitement:0};
 
 var aujourdhui = new Date();
 $scope.absence.dateFin = aujourdhui;
 $scope.absence.dateEnregistrement = aujourdhui;
 
 function employe(){
     Employe.find($rootScope.idEmploye).success(function (data) {
            $scope.absence.employe = data;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération de l'employé");
        });
 }
 
    employe();
        
function permission(){
    return typePermission.findAll();
}

$scope.checkPermission = function(){
    $scope.absence.duree = $scope.absence.typePermission.nombreDeJour;
    console.log("checkPermission");
};

Typepermission.findAll().success(function (data) {
            SweetAlert.finirChargementSucces("Chargement complet !");
            $scope.typepermissions = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des types de permissions !");
        });

  $scope.setAutre = function () {
        console.log("$scope.autre");
        $scope.absence.typePermission = {};
        $scope.absence.duree = 0;
    };
  $scope.reinitialiser = function(){
      $scope.absence = {id:""};
      $scope.absence.dateEnregistrement = "";
      $scope.absence.dateFin = "";
      $scope.absence.duree = "";
      employe();
      
  };
  
  $scope.validerAbsence = function(){
        
     var validite = true;
        $('#absenceForm input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
         if ($scope.absence.typePermission == null) {
            $('#motif').parent().next().show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if (validite === true) {
            SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Absence.add($scope.absence).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Demande d'absence envoyée avec succes");
            console.log("good absence");
            $scope.reinitialiser();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'envoi de la demande");
        });
        }

  };
  
    
  
});