
//Visualiser les details d' groupe d'utilisateur

angular.module('ParametrageModule').controller('DetailUtilisateurController', function ($scope, Servir, Securite, Utilisateur, Entite, Groupe, Utilisateur, SweetAlert, $routeParams)
{
    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    $scope.groupes = [];
    $scope.entites = [];

    var id = $routeParams.id;


    Entite.findAll().success(function (data) {
        $scope.entites = data;
    }).error(function () {
        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération des entités");
    });

    Groupe.getGroupes().success(function (data) {
        $scope.groupes = data;
    }).error(function () {
        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération des groupes d'utilisateur");
    });


    Utilisateur.getCompte(id).success(function (data) {
        $scope.utilisateur = data;
        $scope.prenomNom = "";
        if ($scope.utilisateur.groupe.code != "EMP") {
            Servir.findResponsableEntite($scope.utilisateur.entite).success(function (data) {
                if (data) {
                    $scope.prenomNom = data.employe.civilite.code + ' ' + data.employe.prenom + ' ' + (data.employe.nom).toUpperCase();
                }
            }).error(function () {
                SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération du responsable");

            });
        }

    }).error(function () {
        SweetAlert.simpleNotification("error", "Erreur", "Erreur lors de la récupération des informations sur le compte");
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
        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
        Utilisateur.editCompte(compte).success(function (data) {
            SweetAlert.simpleNotification("success", "Succes", "Modification effectuée avec succes");
            document.location.href = '#/parametrage/utilisateur/show';
        }).error(function () {
            SweetAlert.simpleNotification("error", "Erreur", "Echec de la modification");
        });
    };

});
