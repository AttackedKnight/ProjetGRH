angular.module('DrhModule').controller('ConsulterEmployeFemmeController', function ($scope, $routeParams, Servir, SweetAlert
, Securite, $rootScope, HistoriqueGrade) {

    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */




    $scope.getPerFemme = function () {
        Servir.findPerFemme().success(function (data) {
            $scope.travailleurs = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés") 
        });
    };
    $scope.getPatsFemme = function () {
        Servir.findPatsFemme().success(function (data) {
            $scope.travailleurs = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés") 
        });
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







    $scope.getPerFemmeAvancementOn = function () {
        HistoriqueGrade.findDateAvancementPerFemme(d).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés") 
        });
    };
    $scope.getPerFemmeAvancementBefore = function () {
        HistoriqueGrade.findDateAvantPerFemme(d).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés") 
        });
    };
    $scope.getPerFemmeAvancementAfter = function () {
        HistoriqueGrade.findDateApresPerFemme(d).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés") 
        });
    };
    $scope.getPerFemmeAvancementBetween = function () {
        HistoriqueGrade.findDateEntrePerFemme(dMin, dMax).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés") 
        });
    };


    $scope.getPatsFemmeAvancementOn = function () {
        HistoriqueGrade.findDateAvancementPatsFemme(d).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés") 
        });
    };
    $scope.getPatsFemmeAvancementBefore = function () {
        HistoriqueGrade.findDateAvantPatsFemme(d).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés") 
        });
    };
    $scope.getPatsFemmeAvancementAfter = function () {
        HistoriqueGrade.findDateApresPatsFemme(d).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés") 
        });
    };
    $scope.getPatsFemmeAvancementBetween = function () {
        HistoriqueGrade.findDateEntrePatsFemme(dMin, dMax).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés") 
        });
    };



    /*CRITERES REQUETES*/

    $scope.position = "after";
    $scope.intervalle = false;

    $scope.definirCritere = function () {

        if ($scope.position == "between") {
            $scope.intervalle = true;
        } else {
            $scope.intervalle = false;
        }
    };

    $scope.validerCritere = function () {
        $scope.recupererChaineDate();

        if ($rootScope.groupeUtilisateur.code == 'PATS_AD') {

            if ($scope.position == "between") {
                $scope.getPatsFemmeAvancementBetween();
            }
            if ($scope.position == "on") {
                $scope.getPatsFemmeAvancementOn();
            }
            if ($scope.position == "before") {
                $scope.getPatsFemmeAvancementBefore();
            }
            if ($scope.position == "after") {
                $scope.getPatsFemmeAvancementAfter();
            }


        }
        if ($rootScope.groupeUtilisateur.code == 'PER_AD') {
            if ($scope.position == "between") {
                $scope.getPerFemmeAvancementBetween();
            }
            if ($scope.position == "on") {
                $scope.getPerFemmeAvancementOn();
            }
            if ($scope.position == "before") {
                $scope.getPerFemmeAvancementBefore();
            }
            if ($scope.position == "after") {
                $scope.getPerFemmeAvancementAfter();
            }
        }

        if ($rootScope.groupeUtilisateur.code == 'DRH_AD') {


            if ($routeParams.type == 1) {
                if ($scope.position == "between") {
                    $scope.getPerFemmeAvancementBetween();
                }
                if ($scope.position == "on") {
                    $scope.getPerFemmeAvancementOn();
                }
                if ($scope.position == "before") {
                    $scope.getPerFemmeAvancementBefore();
                }
                if ($scope.position == "after") {
                    $scope.getPerFemmeAvancementAfter();
                }
            }
            if ($routeParams.type == 0) {
                if ($scope.position == "between") {
                    $scope.getPatsFemmeAvancementBetween();
                }
                if ($scope.position == "on") {
                    $scope.getPatsFemmeAvancementOn();
                }
                if ($scope.position == "before") {
                    $scope.getPatsFemmeAvancementBefore();
                }
                if ($scope.position == "after") {
                    $scope.getPatsFemmeAvancementAfter();
                }
            }


        }

    };

    $scope.validerCritere();

    /*CRITERES REQUETES*/



    /*Avencements*/

    if ($rootScope.groupeUtilisateur.code == 'PATS_AD') {
        $scope.getPatsFemme();
    }
    if ($rootScope.groupeUtilisateur.code == 'PER_AD') {
        $scope.getPerFemme();
    }

    if ($rootScope.groupeUtilisateur.code == 'DRH_AD') {
        if ($routeParams.type == 1) {
            $scope.getPerFemme();
        }
        if ($routeParams.type == 0) {
            $scope.getPatsFemme();
        }
    }


});


