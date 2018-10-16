angular.module('DrhModule').controller('ConsulterEmployeHommeController', function ($scope, $routeParams,
        Servir, Employe, UploadFile, SweetAlert, HistoriqueGrade, $rootScope) {

    $scope.getEmploye = function () {
        Servir.findEmployeHomme($rootScope.typeEmployeAssocie.join("-")).success(function (data) {

            if ($routeParams.type) {    //S'il ya un type d'employe specifique � afficher
                $scope.travailleurs = data.filter(retrieveType);
            } else {
                $scope.travailleurs = data;
            }
            $scope.permanents = $scope.travailleurs.filter(retrievePermanents);
            $scope.allContractuels = $scope.travailleurs.filter(retrieveContractuels);
            $scope.validerCritereDateFinContrat();
            $scope.getAvancement();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés !");
        });
    };
    $scope.getEmploye();

    function retrieveType(data) {
        return data.employe.typeEmploye.id == $routeParams.type;
    }

    function retrievePermanents(data) {
        return data.typeContrat.code == 'cdi';
    }

    function retrieveContractuels(data) {
        return data.typeContrat.code == 'cdd';
    }

    $scope.allAvancements = [];
    $scope.getAvancement = function () {
        HistoriqueGrade.findAvancementHomme($rootScope.typeEmployeAssocie.join("-")).success(function (data) {
            if ($routeParams.type) {    //S'il ya un type d'employe specifique � afficher
                $scope.allAvancements = data.filter(retrieveType);
            } else {
                $scope.allAvancements = data;
            }
            $scope.validerCritere();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés !");
        });
    };

    /*Avancements*/

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
        return (dpa > daMin && dpa < daMax);
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

    /*Avancements*/

    /*Contractuel*/

    $scope.getDateFinContratOn = function () {
        $scope.contractuels = $scope.allContractuels.filter(retrieveDateFinContratOn);
    };
    $scope.getDateFinContratBefore = function () {
        $scope.contractuels = $scope.allContractuels.filter(retrieveDateFinContratBefore);
    };
    $scope.getDateFinContratAfter = function () {
        $scope.contractuels = $scope.allContractuels.filter(retrieveDateFinContratAfter);
    };
    $scope.getDateFinContratBetween = function () {
        $scope.contractuels = $scope.allContractuels.filter(retrieveDateFinContratBetween);
    };

    function retrieveDateFinContratOn(data) {
        var dpa = new Date(data.fin);
        var da = new Date(dFinContrat);
        return dpa.toDateString() == da.toDateString();
    }

    function retrieveDateFinContratBefore(data) {
        var dpa = new Date(data.fin);
        var da = new Date(dFinContrat);
        return dpa < da;
    }

    function retrieveDateFinContratAfter(data) {
        var dpa = new Date(data.fin);
        var da = new Date(dFinContrat);
        return dpa > da;
    }

    function retrieveDateFinContratBetween(data) {
        var dpa = new Date(data.fin);
        var daMin = new Date(dMinFinContrat);
        var daMax = new Date(dMaxFinContrat);
        return (dpa > daMin && dpa < daMax);
    }

    /*Contractuel*/

    /*Initialisation date et formatage*/
    var today = new Date();
    var dMin, dMax, d;
    var dMinFinContrat, dMaxFinContrat, dFinContrat;

    $scope.setDefaultInterval = function () {
        var month = today.getMonth();
        var year = today.getFullYear();

        $scope.dateMin = new Date(year, today.getMonth(), 1);
        $scope.dateMax = new Date(year, month + 1, 0);
        $scope.dateFournie = today;

        $scope.dateMinFinContrat = new Date(year, today.getMonth(), 1);
        $scope.dateMaxFinContrat = new Date(year, month + 1, 0);
        $scope.dateFinContratFournie = today;

    };
    $scope.setDefaultInterval();

    $scope.recupererChaineDate = function () {
        dMin = $scope.dateMin.getFullYear() + "-" + ($scope.dateMin.getMonth() + 1) + "-" + $scope.dateMin.getDate();
        dMax = $scope.dateMax.getFullYear() + "-" + ($scope.dateMax.getMonth() + 1) + "-" + $scope.dateMax.getDate();
        d = $scope.dateFournie.getFullYear() + "-" + ($scope.dateFournie.getMonth() + 1) + "-" + $scope.dateFournie.getDate();
    };

    $scope.recupererChaineDateFinContrat = function () {
        dMinFinContrat = $scope.dateMinFinContrat.getFullYear() + "-" + ($scope.dateMinFinContrat.getMonth() + 1) + "-" + $scope.dateMinFinContrat.getDate();
        dMaxFinContrat = $scope.dateMaxFinContrat.getFullYear() + "-" + ($scope.dateMaxFinContrat.getMonth() + 1) + "-" + $scope.dateMaxFinContrat.getDate();
        dFinContrat = $scope.dateFinContratFournie.getFullYear() + "-" + ($scope.dateFinContratFournie.getMonth() + 1) + "-" + $scope.dateFinContratFournie.getDate();
    };

    /*Initialisation date et formatage*/

    /*CRITERES REQUETES AVANCEMENT*/

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

    /*CRITERES REQUETES AVANCEMENT*/


    /*CRITERES REQUETES CONTRAT*/


    $scope.positionFinContrat = "after";
    $scope.intervalleFinContrat = false;

    $scope.definirCritereDateFinContrat = function () {

        if ($scope.positionFinContrat == "between") {
            $scope.intervalleFinContrat = true;
        } else {
            $scope.intervalleFinContrat = false;
        }
    };

    $scope.validerCritereDateFinContrat = function () {
        $scope.recupererChaineDateFinContrat();

        if ($scope.positionFinContrat == "between") {
            $scope.getDateFinContratBetween();
        }
        if ($scope.positionFinContrat == "on") {
            $scope.getDateFinContratOn();
        }
        if ($scope.positionFinContrat == "before") {
            $scope.getDateFinContratBefore();
        }
        if ($scope.positionFinContrat == "after") {
            $scope.getDateFinContratAfter();
        }

    };

    /*CRITERES REQUETES CONTRAT*/


    $scope.deleteAgent = function (employe) {
        Promise.resolve(SweetAlert.confirmerAction("Attention", "Voulez vous vraiement supprimer cet élément ?"))
                .then(function (value) {
                    if (value == true) {
                        SweetAlert.attendreTraitement("Traitement en cours", "Veuillez patienter svp !");
                        Employe.delete(employe.id).success(function () {
                            UploadFile.delete(angular.toJson({chemin: "archives/" + employe.numeroCni})).success(function () {
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




