/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



angular.module('DrhModule').controller('SocialesController', function ($scope, SweetAlert,
        HistoriqueGrade, SyndicatTypeEmploye, GradeTypeEmploye, CaisseSocialeTypeEmploye, MutuelleTypeEmploye,
        $routeParams, UploadFile, Typedocument, Situation, Entite, Diplome, Genre, Formation, Employe,
        Contact, Adresse, Servir, MembreMutuelle, Fonction, Typecontrat, Civilite, Document, Connexion)
{


    $scope.fonction = {id: ""};
    $scope.formProvenanceFichier = "";

    $scope.message = "Bonjour , inf pro ctrl message";
//
//    $scope.templates=[{name:"Informations generales",url:"infosGenerales.html"},
//        {name:"Informations professionelles",url:"infosPro.html"}]

    $scope.removeSelectedSyndicat = function () {
        $scope.$parent.employe.syndicat = null;
        $scope.currentSyndicat = 0;
    };

    $scope.removeSelectedMutuelle = function () {
        $scope.membreMutuelle.mutuelleSante = null;
        $scope.currentMutuelle = 0;
    };

    $scope.removeSelectedCaisseSociale = function () {
        $scope.$parent.employe.caisseSociale = null;
        $scope.$parent.employe.matriculeCaisseSociale = "";
        $scope.currentCaisseSociale = 0;
    };


    /*RECUPERATION DES INFORMATIONS DE L'EMPLOYE*/

    $scope.getSyndicat = function (element) {
        $scope.currentSyndicat = $(element).val();
        $scope.$parent.employe.syndicat = $scope.syndicats.filter(retrieveSyndicat)[0];
    };
    function retrieveSyndicat(data) {
        return data.id == $scope.currentSyndicat;
    }
    ;

    $scope.getCaisseSociale = function (element) {
        $scope.currentCaisseSociale = $(element).val();
        $scope.$parent.employe.caisseSociale = $scope.caissesociales.filter(retrieveCaisseSociale)[0];
    };
    function retrieveCaisseSociale(data) {
        return data.id == $scope.currentCaisseSociale;
    }
    ;

    $scope.getMutulleSante = function (element) {
        $scope.currentMutuelle = $(element).val();
        $scope.membreMutuelle.mutuelleSante = $scope.mutuelles.filter(retrieveMutulleSante)[0];
    };
    function retrieveMutulleSante(data) {
        return data.id == $scope.currentMutuelle;
    }
    ;

    if ($scope.$parent.employe.syndicat != null) {
        $scope.currentSyndicat = $scope.$parent.employe.syndicat.id;
    } else {
        $scope.currentSyndicat = 0;
    }

    if ($scope.$parent.employe.caisseSociale != null) {
        $scope.currentCaisseSociale = $scope.$parent.employe.caisseSociale.id;
    } else {
        $scope.currentCaisseSociale = 0;
    }

    MembreMutuelle.findByEmploye($scope.$parent.employe).success(function (data) {
        if (data) {
            $scope.membreMutuelle = data;
            $scope.currentMutuelle = $scope.membreMutuelle.mutuelleSante.id;
        } else {
            $scope.membreMutuelle = {id: "", employe: $scope.$parent.employe};
            $scope.currentMutuelle = 0;
        }
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement du mutuelle de sante !");
    });

    SyndicatTypeEmploye.findByType($scope.$parent.employe.typeEmploye.id).success(function (data) {
        $scope.syndicats = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des syndicats");
    });

    CaisseSocialeTypeEmploye.findByType($scope.$parent.employe.typeEmploye.id).success(function (data) {
        $scope.caissesociales = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des caisses sociales");
    });

    MutuelleTypeEmploye.findByType($scope.$parent.employe.typeEmploye.id).success(function (data) {
        $scope.mutuelles = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des mutuelles");
    });

    /* toggle edit form */

    $scope.editCaisseSociale = false;
    $scope.editMutuelleSante = false;
    $scope.editSyndicat = false;
    
    $scope.toggleCaisseSocialeEditForm = function () {
        $scope.editCaisseSociale = !$scope.editCaisseSociale;
    };
    
    $scope.toggleMutuelleSanteEditForm = function () {
        $scope.editMutuelleSante = !$scope.editMutuelleSante;
    };
    
    $scope.toggleSyndicatEditForm = function () {
        $scope.editSyndicat = !$scope.editSyndicat;
    };
    
    $scope.currentSyndicat = 0;
    $scope.currentMutuelle = 0;
    $scope.currentCaisseSociale = 0;
    
    $scope.addMutuelle = function () {
        MembreMutuelle.add($scope.membreMutuelle).success(function () {
            ;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de l'enregistrement du mutuelle de santé");
        });
    };

    $scope.deleteMutuelle = function () {
        MembreMutuelle.delete($scope.membreMutuelle.id).success(function () {
            ;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la suppression du mutuelle de santé");
        });
    };

    $scope.editMutuelle = function () {
        MembreMutuelle.edit($scope.membreMutuelle).success(function () {
            ;
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la modification du mutuelle de santé");
        });
    };

});