/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('ServiceModule').controller('DetailAbsenceController', function ($scope, $routeParams, SweetAlert,
        Absence, TypeAutorisation, Servir)
{

    $scope.isAbsence = false;
    $scope.isConge = false;
    
    TypeAutorisation.findAll().success(function (data) {
        $scope.typesAutorisation = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types d'autorisation");
    });
    Absence.find($routeParams.id).success(function (data) {
        $scope.absence = data;
         console.log($scope.absence);
        if ($scope.absence.typeAbsence.code == 'abs') {
            $scope.isAbsence = true;
        }
        if ($scope.absence.typeAbsence.code == 'cong') {
            $scope.isConge = true;
            $scope.dureeIni = angular.copy($scope.absence.duree); //Gardder la duree initiale demande par l'employe(au cas ou ca change, le nombre de jours restant doit etre calcule a nouveau)
            console.log($scope.dureeIni);
        console.log($scope.isConge);
        }
       
        
        
        $scope.findFonctionEmploye();
        $scope.findEntiteEmploye();
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement de l'absence");
    });
    $scope.findFonctionEmploye = function () {
        Servir.findFonctionEmploye($scope.absence.employe.id).success(function (data) {
            $scope.fonction = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement de sa fonction");
        });
    };
    $scope.findEntiteEmploye = function () {
        Servir.findEntiteEmploye($scope.absence.employe.id).success(function (data) {
            $scope.entite = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement de l'entite");
        });
    };
    $scope.modifier = false;
    $scope.modifierDuree = function () {
        $scope.modifier = true;
        $scope.copieDuree = $scope.absence.duree;
        $('#inputDuree').css('border', '1px solid #A6C8FF');
    };
    $scope.validerModifDuree = function () {
        $scope.modifier = false;
        $('#inputDuree').css('border', 'none');
    };
    $scope.annulerModifDuree = function () {
        $scope.modifier = false;
        $scope.absence.duree = $scope.copieDuree;
        $('#inputDuree').css('border', 'none');
    };

    function retrieveTypeAutorisation(data) {
        return data.id == $scope.idTypeAutorisation;
    }

    $scope.validerAbsence = async  function () {
        if ($scope.isAbsence == true) {    //Si c'est de type absence <<(classique)>>
            var selectOptions = {};
            var id;
            for (var i = 0; i < $scope.typesAutorisation.length; i++) { //Construire le tableau a afficher dans la liste de selection du popup
                id = $scope.typesAutorisation[i].id;
                selectOptions[id] = $scope.typesAutorisation[i].libelle;
            }
            const {value: typeAutorisation} = await swal({
                title: 'Type d\'autorisation',
                input: 'select',
                inputOptions: selectOptions,
                inputPlaceholder: 'Selectionner le type d\'autorisation',
                showCancelButton: true,
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (parseInt(value)) {
                            resolve();
                        } else {
                            resolve("Veuillez selectionner le type d'autorisation");
                        }
                    })
                }
            });

            if (typeAutorisation) { //Definir le type d'autorisation de l'absence
                $scope.idTypeAutorisation = parseInt(typeAutorisation);
                $scope.absence.typeAutorisation = $scope.typesAutorisation.filter(retrieveTypeAutorisation)[0];
                
                $scope.completerAbsence();
            }
        }
        else{
            console.log("non Abse")
            $scope.completerAbsence();
        }
        

    };
    
    $scope.confimerValidationAbsence = async function () {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement accepter cet demande ?"))
                .then(function (value) {
                    if (value == true) {
                        $scope.validerAbsence();
                    }
                });
    }

    $scope.refuserAbsence = async function () {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement annuler cet demande ?"))
                .then(function (value) {
                    if (value == true) {
                        $scope.absence.etatTraitement = -1;
                        $scope.editAbsence();
                    }
                });
    }

    $scope.editAbsence = function () {
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Absence.edit($scope.absence).success(function () {
            SweetAlert.simpleNotification("success", "Succes", "Traitement effectue avec succes");
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de traitement");
        });
    };
    
    $scope.completerAbsence = function () {
        var dateDebut = new Date($scope.absence.dateDebut);
        var dateRetour = new Date($scope.absence.dateDebut);
        dateRetour.setDate(dateRetour.getDate() + $scope.absence.duree);    //Ajouter la duree(en nombre de jours) a la date debut
        dateRetour.setDate(dateRetour.getDate() + countWeekEnd(dateDebut, dateRetour)); //Compte le nombre samedi et dimanche entre les deux date et l'ajouter a date fin(pour ne tenir compte que des jours ouvrables)
        $scope.absence.etatTraitement = 1;
        $scope.absence.dateFin = dateRetour;
        if ($scope.isConge == true && ($scope.dureeIni != $scope.absence.duree)) {
           //Si c'est une demande de conge est que le nombre de jours initialement demande a ete modifie :
           if($scope.dureeIni > $scope.absence.duree){//Si ca a diminué
               $scope.absence.jourRestant += $scope.dureeIni - $scope.absence.duree; //ajouter l'ecart
           }
           else{//Si ca a augmenté
               $scope.absence.jourRestant -=  $scope.absence.duree - $scope.dureeIni; //soustraire l'ecart
           }
        }
        $scope.editAbsence();
    };

    /*Compter le nombre de jour de week end entre les deux dates : si non nul ajouter ca � la dur�e pour calculer la date de fin de l'absence*/
    function countWeekEnd(dateDebut, dateRetour) {
        var nbreJourWeekEnd = 0;
        var day;
        while (dateDebut <= dateRetour) {
            day = dateDebut.getDay();
            if (day == 6 || day == 0) {   //Si c'est un Samedi ou Dimanche
                nbreJourWeekEnd++;
            }
            dateDebut.setDate(dateDebut.getDate() + 1);
        }
        if (dateRetour.getDay() == 6) {   //Si la date de retour est un Samedi
            nbreJourWeekEnd +=2 ;   //Ajouter 2 jours pour aller au lundi
        }
        if (dateRetour.getDay() == 0) {   //Si la date de retour est un Dimanche
            nbreJourWeekEnd++;  //Ajouter 1 jours pour aller au lundi
        }
        return nbreJourWeekEnd;
    };
});
