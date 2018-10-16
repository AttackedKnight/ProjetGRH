
//Visualiser les details d' groupe d'utilisateur

angular.module('ParametrageModule').controller('DetailUtilisateurController', function ($scope, Servir,Civilite,
 Utilisateur, Entite, Groupe, Utilisateur, SweetAlert, $routeParams)
{

    $scope.groupes = [];
    $scope.entites = [];

    var id = $routeParams.id;


    Entite.findAll().success(function (data) {
        $scope.entites = data;
    }).error(function () {
        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des entités");
    });

    Groupe.getGroupes().success(function (data) {
        $scope.groupes = data;
    }).error(function () {
        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des groupes d'utilisateurs");
    });


    Utilisateur.getCompte(id).success(function (data) {
        $scope.utilisateur = data;
        $scope.prenomNom = "";
        if ($scope.utilisateur.groupe.code != "EMP") {
            Servir.findResponsableEntite($scope.utilisateur.entite).success(function (data) {
                if (data) {
                    var situation = '';     //Requise si seulement l'employe est feminin . Pour les hommes c'est toujour Mr(la civilt�)
                    if(data.employe.genre.libelle != 'Masculin'){
                        situation = data.employe.situationMatrimoniale.id + '';
                    }
                    Civilite.findByGenreAndSituation(data.employe.genre.id,situation).success(function(civilite){
                        $scope.prenomNom = civilite.code + ' ' + data.employe.prenom + ' ' + (data.employe.nom).toUpperCase();
                    }).error(function(){
                        SweetAlert.finirChargementEchec("Erreur lors de la recupération de la civilité!");
                    });
//                    $scope.prenomNom = data.employe.civilite.code + ' ' + data.employe.prenom + ' ' + (data.employe.nom).toUpperCase();
                }
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération du responsable");
            });
        }
        
        if($scope.utilisateur.entite != null){
            for (var i = 0; i < $scope.entites.length; i++) {
                if ($scope.entites[i].id == $scope.utilisateur.entite.id) {
                    $scope.selectedEntite = $scope.entites[i];
                    break;
                }
            }
        }
        
        
        for (var i = 0; i < $scope.groupes.length; i++) {
            if ($scope.groupes[i].id == $scope.utilisateur.groupe.id) {
                $scope.selectedGroupe = $scope.groupes[i];
                break;
            }
        }
        
    }).error(function () {
        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la recupération des informations sur le compte");
    });


    $scope.controlForm = function (c) {
        if (c.entite == null) {
            $("div.requis").eq(0).show("slow").delay(3000).hide("slow");
        } else {
            if (c.groupe == null) {
                $("div.requis").eq(1).show("slow").delay(3000).hide("slow");
            } else {
                if (c.login == null || c.login == "") {
                    $("div.requis").eq(2).show("slow").delay(3000).hide("slow");
                } else {
                    if (c.motDePasse == null || c.motDePasse == "") {
                        $("div.requis").eq(3).show("slow").delay(3000).hide("slow");
                    } else {
                        c.email = c.entite.email;
                        $scope.modifierCompteUtilisateur(c);
                    }
                }
            }
        }

    };

    $scope.modifierCompteUtilisateur = function (compte) {
        compte.entite = $scope.selectedEntite;
        compte.groupe = $scope.selectedGroupe;
        
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Utilisateur.editCompte(compte).success(function (data) {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            document.location.href = '#/parametrage/utilisateur/show';
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

});
