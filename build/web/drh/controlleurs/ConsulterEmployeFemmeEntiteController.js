angular.module('DrhModule').controller('ConsulterEmployeFemmeEntiteController', function ($scope, $q, $routeParams,
Servir, Entite, Securite, SweetAlert, $rootScope, HistoriqueGrade) {

    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */


    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }


    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */

    /*     RECUPPERER ENTITES FILLES    */

    /*  Recuperer l'entite et chercher ses entites enfants  */

    $scope.filles = [];

    Entite.find($routeParams.id).success(function (data) {
        $scope.entiteChoisie = data;

        Entite.findAll().success(function (data) {
            $scope.entites = data;
            $scope.filles = $scope.getEntitesFille();

            $scope.getEmployeEntite();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des entités");
        });

    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement de l'entité ");
    });

    /*  Recuperer l'entite et chercher ses entites enfants  */

    $scope.getEntitesFille = function () {
        var filles = [];
        for (var i = 0; i < $scope.entites.length; i++) {
            if ($scope.estEnfant($scope.entites[i], $scope.entiteChoisie) == true) {
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


    /*     RECUPPERER ENTITES FILLES    */


     /*ok*/
    $scope.getEmployeEntite = function () {
        var req_tab = [];
        var cumul = [];
        for (var i = 0; i < $scope.filles.length; i++)
        {
            req_tab.push(Servir.findEmployeFemmeEntite($rootScope.typeEmployeAssocie.join("-"),$scope.filles[i].id));
        }
        $q.all(req_tab).then(function (result) {
            for (var i = 0; i < result.length; i++)
            {
                if (result[i].data.length > 0) {
                    cumul = cumul.concat(result[i].data);
                }
            }
            if ($routeParams.type) {    //S'il ya un type d'employe specifique � afficher
                $scope.travailleurs = cumul.filter(retrieveType);
            } else {
                $scope.travailleurs = cumul;
            }
            $scope.getEntiteAvancement();
        });
    };
    
    
    function retrieveType(data) {
        return data.employe.typeEmploye.id == $routeParams.type;
    }
    
    $scope.allAvancements = [];
    
    $scope.getEntiteAvancement = function () {
        var req_tab = [];
        var cumul = [];
        for (var i = 0; i < $scope.filles.length; i++)
        {
            req_tab.push(HistoriqueGrade.findAvancementEntiteFemme($rootScope.typeEmployeAssocie.join("-"), $scope.filles[i].id));
        }
        $q.all(req_tab).then(function (result) {
            for (var i = 0; i < result.length; i++)
            {
                if (result[i].data.length > 0) {
                    cumul = cumul.concat(result[i].data);
                }
            }
            if ($routeParams.type) {    //S'il ya un type d'employe specifique � afficher
                $scope.allAvancements = cumul.filter(retrieveType);
            } else {
                $scope.allAvancements = cumul;
            }
            $scope.validerCritere();
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

    /*CRITERES REQUETES*/



    /*Avencements*/
    
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


