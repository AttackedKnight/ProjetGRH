angular.module('DrhModule').controller('ConsulterEmployeHommeController', function ($scope, $routeParams, Securite, 
Servir, SweetAlert, HistoriqueGrade, $rootScope) {
    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */


    $scope.getPatsHomme = function () {
        Servir.findPatsHomme().success(function (data) {
            $scope.travailleurs = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés ");
        });
    };
    $scope.getPerHomme = function () {
        Servir.findPerHomme().success(function (data) {
            $scope.travailleurs = data;
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés ");
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







    $scope.getPerHommeAvancementOn = function () {
        HistoriqueGrade.findDateAvancementPerHomme(d).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés ");
        });
    };
    $scope.getPerHommeAvancementBefore = function () {
        HistoriqueGrade.findDateAvantPerHomme(d).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés ");
        });
    };
    $scope.getPerHommeAvancementAfter = function () {
        HistoriqueGrade.findDateApresPerHomme(d).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés ");
        });
    };
    $scope.getPerHommeAvancementBetween = function () {
        HistoriqueGrade.findDateEntrePerHomme(dMin, dMax).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés ");
        });
    };


    $scope.getPatsHommeAvancementOn = function () {
        HistoriqueGrade.findDateAvancementPatsHomme(d).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés ");
        });
    };
    $scope.getPatsHommeAvancementBefore = function () {
        HistoriqueGrade.findDateAvantPatsHomme(d).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés ");
        });
    };
    $scope.getPatsHommeAvancementAfter = function () {
        HistoriqueGrade.findDateApresPatsHomme(d).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés ");
        });
    };
    $scope.getPatsHommeAvancementBetween = function () {
        HistoriqueGrade.findDateEntrePatsHomme(dMin, dMax).success(function (data) {
            $scope.avancements = data;

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés ");
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
                $scope.getPatsHommeAvancementBetween();
            }
            if ($scope.position == "on") {
                $scope.getPatsHommeAvancementOn();
            }
            if ($scope.position == "before") {
                $scope.getPatsHommeAvancementBefore();
            }
            if ($scope.position == "after") {
                $scope.getPatsHommeAvancementAfter();
            }


        }
        if ($rootScope.groupeUtilisateur.code == 'PER_AD') {
            if ($scope.position == "between") {
                $scope.getPerHommeAvancementBetween();
            }
            if ($scope.position == "on") {
                $scope.getPerHommeAvancementOn();
            }
            if ($scope.position == "before") {
                $scope.getPerHommeAvancementBefore();
            }
            if ($scope.position == "after") {
                $scope.getPerHommeAvancementAfter();
            }
        }

        if ($rootScope.groupeUtilisateur.code == 'DRH_AD') {


            if ($routeParams.type == 1) {
                if ($scope.position == "between") {
                    $scope.getPerHommeAvancementBetween();
                }
                if ($scope.position == "on") {
                    $scope.getPerHommeAvancementOn();
                }
                if ($scope.position == "before") {
                    $scope.getPerHommeAvancementBefore();
                }
                if ($scope.position == "after") {
                    $scope.getPerHommeAvancementAfter();
                }
            }
            if ($routeParams.type == 0) {
                if ($scope.position == "between") {
                    $scope.getPatsHommeAvancementBetween();
                }
                if ($scope.position == "on") {
                    $scope.getPatsHommeAvancementOn();
                }
                if ($scope.position == "before") {
                    $scope.getPatsHommeAvancementBefore();
                }
                if ($scope.position == "after") {
                    $scope.getPatsHommeAvancementAfter();
                }
            }


        }

    };

    $scope.validerCritere();

    /*CRITERES REQUETES*/



    /*Avencements*/

    if ($rootScope.groupeUtilisateur.code == 'PATS_AD') {
        $scope.getPatsHomme();
    }
    if ($rootScope.groupeUtilisateur.code == 'PER_AD') {
        $scope.getPerHomme();
    }

    if ($rootScope.groupeUtilisateur.code == 'DRH_AD') {
        if ($routeParams.type == 1) {
            $scope.getPerHomme();
        }
        if ($routeParams.type == 0) {
            $scope.getPatsHomme();
        }
    }


});




