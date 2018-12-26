/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('EmployeModule').controller('AbsenceController', function ($scope, Typepermission, Absence,
        AbsenceTypeEmploye, Employe, $rootScope, SweetAlert)
{
    $scope.absence = {id: "", etatTraitement: 0};
    var aujourdhui = new Date();
    $scope.absence.dateEnregistrement = aujourdhui;
    $scope.autreMotif = false;

    Employe.find($rootScope.idEmploye).success(function (data) {
        $scope.employe = data;
        $scope.absence.employe = $scope.employe;
        $scope.findTypeAbsence($scope.employe.typeEmploye.id);
        $scope.calculNombreJourDeConge();
    }).error(function () {
        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération de l'employé");
    });

    /*Recuperer les types de demandes d'absence qu'il peut faire*/
    $scope.findTypeAbsence = function (idType) {
        AbsenceTypeEmploye.findByType(idType).success(function (data) {
            SweetAlert.finirChargementSucces("Chargement complet !");
            $scope.typeAbsences = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des types d'absence !");
        });
    };

    /*Recuperer les types de permissions pre-definis*/
    Typepermission.findAll().success(function (data) {
        SweetAlert.finirChargementSucces("Chargement complet !");
        $scope.typepermissions = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types de permission !");
    });

    $scope.setMotifAndDuree = function () {
        $scope.absence.duree = $scope.absence.typePermission.nombreDeJour;
        $scope.absence.motif = $scope.absence.typePermission.libelle;
    };

    $scope.checkAutreMotif = function () {
        if ($scope.autreMotif == true) {  //Si le motif n'apparait pas dans les types de permission pre-definis
            $scope.absence.typePermission = undefined;
            $scope.absence.duree = 1;
            $scope.absence.motif = undefined;
        }
    };
    $scope.reinitialiser = function () {
        $scope.autreMotif = false;
        $scope.absence = {id: "", etatTraitement: 0, employe: $scope.employe};
    };

    $scope.validerAbsence = function () {
        var validite = true;
        $('#absenceForm input').each(function (e) {
            if ($(this).val() === "") {
                $(this).parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        });
        if ($scope.absence.typeAbsence == null) {
            $('#typeAbsence').parent().next().show("slow").delay(3000).hide("slow");
            validite = false;
        }
        if ($scope.absence.typeAbsence.code != 'cong') {   //Motif est verifier s'il ne s'agit pas d'un conge
            if ($scope.autreMotif == false && angular.isUndefined($scope.absence.typePermission)) {
                $('#motif').parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
            if ($scope.autreMotif == true && (angular.isUndefined($scope.absence.motif) || $scope.absence.motif == "")) {
                $('#autreMotif').parent().next().show("slow").delay(3000).hide("slow");
                validite = false;
            }
        }
        if (validite === true) {
            $scope.addAbsence();
        }

    };

    $scope.addAbsence = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Absence.add($scope.absence).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Demande d'absence envoyée avec succes");
            $scope.reinitialiser();
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'envoi de la demande");
        });
    };

    $scope.calculNombreJourDeConge = function () {
        var dateReference;
        var today = new Date();
        var nombreDeJourDeConge = 0;
        /*Recuperer la date de retour du dernier cong�*/
        Absence.getDernierConge($scope.employe.id).success(function (data) {
            if(data){    
                /*Si c'est pas vide : l'employe a une fois pris un conge 
                 * dans ce cas la date reference est la date de retour du dernier conge*/
                dateReference = new Date(data.dateRetour);
            }
            else{   
                /*Sinon : l'employe n'a pas encore eu un conge , dans ce cas 
                 * la date reference est la date de recrutement*/
                dateReference = new Date($scope.employe.dateRecrutement);
            }
            //Calculer le nombre de mois entre DateActuelle-DateReference
            var nombreDeMois = (today.getMonth() - dateReference.getMonth())
                    + ((today.getFullYear() - dateReference.getFullYear())*12);
            if(today.getDate() < dateReference.getDate()){
                nombreDeMois--;
            }
            console.log("Nombre de mois ecoulé entre la date de retour du dernier conge(de recrutement) >>>> "+nombreDeMois);
            //Verifier que c'est au moins superieur ou egal a 1 an
            if(nombreDeMois>=12){               
                //Calculer le nombre de jours de conge auquel l'employe a droit
                nombreDeJourDeConge = 2*nombreDeMois; //Deux jours ouvrables de conge par mois
                console.log("Vous avez droit a un conge de duree min "+nombreDeJourDeConge);
                /*Verifier l'anciennete et la situation matrimoniale(si femme) pour savoir s'il a droit a des jours supplementaires*/
                //Anciennete
                var dateRecru = new Date($scope.employe.dateRecrutement)
                var nombreDeMoisAnciennete = (today.getMonth() - dateRecru.getMonth())
                        + ((today.getFullYear() - dateRecru.getFullYear())*12);
                if(today.getDate() < dateRecru.getDate()){
                    nombreDeMoisAnciennete--;
                }
                var ancienneteEnAnneee = Math.ceil(nombreDeMoisAnciennete/12);
                console.log("Vous avez passe "+ancienneteEnAnneee+" an(s) au sein de l'universite")
                if(ancienneteEnAnneee > 25){
                    nombreDeJourDeConge +=6;
                    
                }
                else if(ancienneteEnAnneee > 20){
                    nombreDeJourDeConge +=3;
                }
                else if(ancienneteEnAnneee > 15){
                    nombreDeJourDeConge +=2;
                }
                else if(ancienneteEnAnneee > 10){
                    console.log("Vous avez "+1+" jour(s) de plus");
                    nombreDeJourDeConge +=1;
                }
                console.log("Vous avez droit a un conge de duree"+nombreDeJourDeConge);
                //Nombre de jours supplementaires si femme avec enfant(s) de moins de 14ans
                if($scope.employe.genre.libelle = "Femme"){
                    var nombreEnfants =$scope.employe.nombreEnfant | 0;
                    console.log("Vous avez "+nombreEnfants+" enfant(s)")
                    //1 jour de plus par enfant de moins de 14ans
                }
                
                /*Recuperer la liste des absences deductibles apres le dernier conges et faire la somme des durees*/
//                Absence.getAbsenceDeductible($scope.employe.id,data.dateRetour).success(function (absenceDeduc) {
//                    console.log("Absence deductibles "+absenceDeduc);
//                }).error(function () {
//                    SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération des absences déductibles");
//                });
            }
            else{
                console.log("Vous ne pouvez pas prendre de conge");
            }
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération du dernier congé");
        });

        

        /*Soustraire le nombre de jour d'absences deductibles au nombre de jour auquel il a droit*/    
    };
});