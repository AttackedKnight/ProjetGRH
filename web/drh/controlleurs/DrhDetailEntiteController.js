/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('DrhModule').controller('DrhDetailEntiteController', function ($scope, $q, Entite, SweetAlert,
        TypeEntite, Servir,Civilite)
{


    Entite.findAll().success(function (data) {
        $scope.entites = data;
        $scope.VoirDetails($scope.entites[0]);
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des entités");
    });



    TypeEntite.findAll().success(function (data) {
        $scope.typeentites = data;
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des types d'entités");
    });

    $scope.filles = [];

    $scope.getEntitesFille = function () {
        var filles = [];
        for (var i = 0; i < $scope.entites.length; i++) {
            if ($scope.estEnfant($scope.entites[i], $scope.entite) == true) {
                filles.push($scope.entites[i]);
            }
        }
        return filles;
    };

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

    $scope.VoirDetails = function (e) {
        $scope.entite = e;
        $scope.filles = $scope.getEntitesFille();

        var req_tab = [];
        var cumul = 0;
        Servir.findResponsableEntite(e).success(function (data) {

            for (var j = 0; j < $scope.filles.length; j++) {
                req_tab.push(Servir.countEmploye($scope.filles[j]));
            }
            $q.all(req_tab).then(function (result) {
                for (var i = 0; i < result.length; i++)
                {
                    cumul += parseInt(result[i].data);
                }
                $scope.effectif = cumul;
            });

            

            if (data) {
                $scope.responsable = data;
                var situation = '';     //Requise si seulement l'employe est feminin . Pour les hommes c'est toujour Mr(la civilt�)
                if(data.employe.genre.libelle != 'Homme'){
                    situation = data.employe.situationMatrimoniale.id + '';
                }
                Civilite.findByGenreAndSituation(data.employe.genre.id,situation).success(function(civilite){
                    $scope.prenomNom = civilite.code + ' ' + data.employe.prenom + ' ' + (data.employe.nom).toUpperCase();
                }).error(function(){
                    SweetAlert.finirChargementEchec("Erreur lors de la recupération de la civilité!");
                });
//                $scope.prenomNom = $scope.responsable.employe.civilite.code + ' ' + $scope.responsable.employe.prenom + ' ' + ($scope.responsable.employe.nom).toUpperCase();
            }
            else{
                $scope.prenomNom = "";
                $scope.responsable=null;
            }

        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des informations du \n\
            responsable de l'entité");

        });


    };

});
