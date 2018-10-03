angular.module('DrhModule').controller('ConsulterEmployeHommeController', function ($scope, $routeParams, Securite, 
Servir, SweetAlert, HistoriqueGrade, $rootScope) {
    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    $scope.getEmploye = function () {
        Servir.findEmployeHomme($rootScope.typeEmployeAssocie.join("-")).success(function (data) {

            if ($routeParams.type) {    //S'il ya un type d'employe specifique à afficher
                $scope.travailleurs = data.filter(retrieveType);
            } else {
                $scope.travailleurs = data;
            }
            $scope.getAvancement();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés !");
        });
    };
    $scope.getEmploye();

    function retrieveType(data) {
        return data.employe.typeEmploye.id == $routeParams.type;
    }

    $scope.allAvancements = [];
    $scope.getAvancement = function () {
        HistoriqueGrade.findAvancementHomme($rootScope.typeEmployeAssocie.join("-")).success(function (data) {
            if ($routeParams.type) {    //S'il ya un type d'employe specifique à afficher
                $scope.allAvancements = data.filter(retrieveType);
            } else {
                $scope.allAvancements = data;
            }
            $scope.validerCritere();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés !");
        });
    };

    $scope.getAvancementOn = function () {
        $scope.avancements = $scope.allAvancements.filter(retrieveAvancementOn);
    };
    $scope.getAvancementBefore = function () {
        $scope.avancements = $scope.allAvancements.filter(retrieveAvancementBefore);
    };
    $scope.getAvancementAfter = function () {
        $scope.avancements = $scope.allAvancements.filter(retrieveAvancementAfter);
    };
    $scope.getAvancementBetween = function () {
        $scope.avancements = $scope.allAvancements.filter(retrieveAvancementBetween);
    };

    function retrieveAvancementOn(data) {
        var dpa = new Date(data.dateProchainAvancement);
        var da = new Date(d);
        return dpa.toDateString() == da.toDateString();
    }

    function retrieveAvancementBefore(data) {
        var dpa = new Date(data.dateProchainAvancement);
        var da = new Date(d);
        return dpa < da;
    }

    function retrieveAvancementAfter(data) {
        var dpa = new Date(data.dateProchainAvancement);
        var da = new Date(d);
        return dpa > da;
    }

    function retrieveAvancementBetween(data) {
        var dpa = new Date(data.dateProchainAvancement);
        var daMin = new Date(dMin);
        var daMax = new Date(dMax);
        return (dpa> daMin && dpa < daMax);
    }
    
    $scope.validerCritere = function () {
        $scope.recupererChaineDate();

        if ($scope.position == "between") {
            $scope.getAvancementBetween();
        }
        if ($scope.position == "on") {
            $scope.getAvancementOn();
        }
        if ($scope.position == "before") {
            $scope.getAvancementBefore();
        }
        if ($scope.position == "after") {
            $scope.getAvancementAfter();
        }

    };

    /*Avencements*/
    var today = new Date();
    var dMin, dMax, d;

    /*Initialisation date et formatage*/

    $scope.setDefaultInterval = function () {
        var month = today.getMonth();
        var year = today.getFullYear();

        $scope.dateMin = new Date(year, today.getMonth(), 1);
        $scope.dateMax = new Date(year, month + 1, 0);
        $scope.dateFournie = today;

    };

    $scope.recupererChaineDate = function () {
        dMin = $scope.dateMin.getFullYear() + "-" + ($scope.dateMin.getMonth() + 1) + "-" + $scope.dateMin.getDate();
        dMax = $scope.dateMax.getFullYear() + "-" + ($scope.dateMax.getMonth() + 1) + "-" + $scope.dateMax.getDate();
        d = $scope.dateFournie.getFullYear() + "-" + ($scope.dateFournie.getMonth() + 1) + "-" + $scope.dateFournie.getDate();
    };

    $scope.setDefaultInterval();
    $scope.recupererChaineDate();

    /*Initialisation date et formatage*/

//    /*CRITERES REQUETES*/

    $scope.position = "after";
    $scope.intervalle = false;

    $scope.definirCritere = function () {

        if ($scope.position == "between") {
            $scope.intervalle = true;
        } else {
            $scope.intervalle = false;
        }
    };


    $scope.deleteAgent = function (employe) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        Employe.delete(employe.id).success(function () {
                            UploadFile.delete(angular.toJson({chemin:"archives/" + employe.numeroCni})).success(function () {
                                SweetAlert.simpleNotification("success", "Succes", "Suppression effectuée avec succes");
                                if ($rootScope.groupeUtilisateur.code == 'PATS_AD') {
                                    $scope.getPats();
                                }
                                if ($rootScope.groupeUtilisateur.code == 'PER_AD') {
                                    $scope.getPer();
                                }

                                if ($rootScope.groupeUtilisateur.code == 'DRH_AD') {


                                    if ($routeParams.type == 1) {
                                        $scope.getPer();
                                    } else if ($routeParams.type == 0) {
                                        $scope.getPats();
                                    } else {
                                        $scope.getAll();
                                    }


                                }
                            }).error(function () {
                                SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                            });

                        }).error(function () {
                            SweetAlert.simpleNotification("error", "Erreur", "Echec de la suppression");
                        });
                    }
                });
    };

});




