angular.module('StatistiqueModule').controller('StatistiqueGeneraleController', function ($scope, $rootScope, Grade,
        SweetAlert, Statistique, HistoriqueGrade, Genre, $q) {

    $scope.hgt = {height: 300 + 'px'};
    $scope.hgt2 = {height: 300 + 'px'};

    $scope.allEmployes = [];
    $scope.corpsPer = [];
    $scope.classePats = [];
    $scope.genres = [];

    Genre.findAll().success(function (data) {
        $scope.genres = data;
        $scope.countTotalEmploye();
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des genres");
    });

    $scope.countTotalEmploye = function () {
        Statistique.countEmploye().success(function (totalEmployes) {    //effectif total des employes, pour calculer la proportion d'un type de personnel donne
            $scope.totalEmployes = totalEmployes;
            $scope.startRepporting();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des genres");
        });
    };


    $scope.startRepporting = function () {
        Statistique.getEmploye($rootScope.typeEmployeAssocie.join("-")).success(function (data) {
            $scope.allEmployes = data;

            $scope.calculerPourcentageParTypeEmploye();
            $scope.calculerPourcentageParGenre();
            $scope.construireGrapheTranche($scope.debutTrancheAge, $scope.finTrancheAge, $scope.intervalleTrancheAge);

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des employés !");
        });

        HistoriqueGrade.findAllAvancement().success(function (data) {
            $scope.allGrades = data;

            var req_tab = [];
            req_tab.push(Grade.getDistinctCorps());
            req_tab.push(Grade.getDistinctPatsClasse());

            $q.all(req_tab).then(function (result) {
                $scope.corpsPer = result[0].data.value;
                $scope.classePats = result[1].data.value;

                $scope.countEffectifParNiveauEtude();
            });

        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des grades !");
        });
    };

    function retrieveByCorps(data) {
        return data.grade.corps.libelle == libelleCorps;
    }

    function retrieveByClasse(data) {
        return data.grade.classe.libelle == libelleClasse;
    }

    function retrieveAnneeNaissanceBetween(data) {
        var dateNaiss = new Date(data.dateDeNaissance);
        dateNaiss = new Date(dateNaiss.getFullYear() + '-' + (dateNaiss.getMonth() + 1) + '-' + dateNaiss.getDate());

        return   dateNaiss >= dateNaissMin &&  dateNaiss <= dateNaissMax;
    }

    $scope.idType;
    function retrieveType(data) {
        return data.typeEmploye.id == $scope.idType;
    }
    function retrieveTypeInGrade(data) {
        return data.employe.typeEmploye.id == $scope.idType;
    }

    $scope.idGenre;
    function retrieveGenre(data) {
        return data.genre.id == $scope.idGenre;
    }

    /*Pourcentage par type de personnel*/
    $scope.calculerPourcentageParTypeEmploye = function () {
        var pourcentageParType = [];
        var effectifType;
        for (var i = 0; i < $rootScope.typeEmploye_o.length; i++) {
            $scope.idType = $rootScope.typeEmploye_o[i].id;
            effectifType = $scope.allEmployes.filter(retrieveType).length;
            pourcentageParType.push({
                "categorie": $rootScope.typeEmploye_o[i].code,
                "pourcentage": ((effectifType / $scope.totalEmployes) * 100).toFixed(2)

            });
        }
        if ($scope.totalEmployes > $scope.allEmployes.length) { //La personne connecte ne gere qu'une partie(Type de personnel) des employe
            pourcentageParType.push({
                "categorie": "AUTRE(s)",
                "pourcentage": (100 - (($scope.allEmployes.length / $scope.totalEmployes) * 100)).toFixed(2)

            });
        }
        $scope.voirPourcentagePerEtPats(pourcentageParType);
    };

    $scope.voirPourcentagePerEtPats = function (data) {
        var chartPatsPer = AmCharts.makeChart("statPatsPer", {
            "type": "pie",
            "startDuration": 2,
            "theme": "light",
            "addClassNames": true,
            "legend": {
                "position": "top",
                "margin": 0,
                "autoMargins": false
            },
            "innerRadius": "20%",
            "defs": {
                "filter": [{
                        "id": "shadow",
                        "width": "200%",
                        "height": "200%",
                        "feOffset": {
                            "result": "offOut",
                            "in": "SourceAlpha",
                            "dx": 0,
                            "dy": 0
                        },
                        "feGaussianBlur": {
                            "result": "blurOut",
                            "in": "offOut",
                            "stdDeviation": 5
                        },
                        "feBlend": {
                            "in": "SourceGraphic",
                            "in2": "blurOut",
                            "mode": "normal"
                        }
                    }]
            },
            "dataProvider": data,
            "valueField": "pourcentage",
            "titleField": "categorie",
            "labelRadius": 15,
            "depth3D": 20,
            "angle": 25,

            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            "export": {
                "enabled": true
            }
        });
    };
    /*Pourcentage par type de personnel*/

    /*Pourcentage par genre*/

    $scope.calculerPourcentageParGenre = function () {
        var datas = [];
        if (angular.isDefined($scope.selectedTypeInGenre) && angular.isDefined($scope.selectedTypeInGenre.id)) {  //S'il y a un type de personnel cible, on filtre selon ce type d'abord
            $scope.idType = $scope.selectedTypeInGenre.id;
            datas = $scope.allEmployes.filter(retrieveType);
        } else {       //Sinon on travaille sur l'effectif total
            datas = angular.copy($scope.allEmployes);
        }
        var pourcentageParGenre = [];
        var effectifGenre;
        for (var i = 0; i < $scope.genres.length; i++) {
            $scope.idGenre = $scope.genres[i].id;
            effectifGenre = datas.filter(retrieveGenre).length;
            pourcentageParGenre.push({
                "genre": $scope.genres[i].libelle,
                "pourcentage": ((effectifGenre / datas.length) * 100).toFixed(2)

            });
        }
        $scope.voirPourcentageParGenre(pourcentageParGenre);
    };

    $scope.voirPourcentageParGenre = function (data) {
        var chartHomFem = AmCharts.makeChart("statParGenre", {
            "type": "pie",
            "startDuration": 2,
            "theme": "light",
            "addClassNames": true,
            "legend": {
                "position": "top",
                "margin": 0,
                "autoMargins": false
            },
            "innerRadius": "20%",
            "defs": {
                "filter": [{
                        "id": "shadow",
                        "width": "200%",
                        "height": "200%",
                        "feOffset": {
                            "result": "offOut",
                            "in": "SourceAlpha",
                            "dx": 0,
                            "dy": 0
                        },
                        "feGaussianBlur": {
                            "result": "blurOut",
                            "in": "offOut",
                            "stdDeviation": 5
                        },
                        "feBlend": {
                            "in": "SourceGraphic",
                            "in2": "blurOut",
                            "mode": "normal"
                        }
                    }]
            },
            "dataProvider": data,
            "valueField": "pourcentage",
            "titleField": "genre",
            "labelRadius": 15,
            "depth3D": 20,
            "angle": 25,

            "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
            "export": {
                "enabled": true
            }
        });

    };

    /*Pourcentage par genre*/

    /*Trache age*/

    $scope.today = new Date();
    $scope.trancheAge = function (debut, fin) {
        var from = new Date();
        var to = new Date();
        var dates = [];
        from.setFullYear(from.getFullYear() - debut);
        to.setFullYear(to.getFullYear() - fin);
        dates.push(from);
        dates.push(to);

        return dates;
    };

    var dateNaissMin;
    var dateNaissMax;
    $scope.construireGrapheTranche = function (debut, fin, intervalle) {
        
        var donnees = [];
        var end = debut + intervalle;
        var intervalle_date = [];
        var datas = [];
        if (angular.isDefined($scope.selectedTypeInTrancheAge) && angular.isDefined($scope.selectedTypeInTrancheAge.id)) {  //S'il y a un type de personnel cible, on filtre selon ce type d'abord
            $scope.idType = $scope.selectedTypeInTrancheAge.id;
            datas = $scope.allEmployes.filter(retrieveType);
        } else {       //Sinon on travaille sur l'effectif total
            datas = angular.copy($scope.allEmployes);
        }
        var une_barre = {};
        /*Creation de l'objet a afficher sur le graphe*/
        var i = 0;
        while (end <= fin) {
            intervalle_date = $scope.trancheAge(debut, end);
            dateNaissMax = intervalle_date[0];
            dateNaissMin = intervalle_date[1];
            une_barre = {};
            une_barre.annee = debut + '-' + end;
            debut = end;
            end = debut + intervalle;
            var effectifGenre;
            var libelleGenre;
            for (var i = 0; i < $scope.genres.length; i++) {
                $scope.idGenre = $scope.genres[i].id;
                effectifGenre = (datas.filter(retrieveGenre)).filter(retrieveAnneeNaissanceBetween).length;
                libelleGenre = $scope.genres[i].libelle;
                une_barre['' + libelleGenre] = effectifGenre;
            }
            donnees.push(une_barre);
        }
        var graphVal = [];
        for (var i = 0; i < $scope.genres.length; i++) {
            graphVal.push({
                "balloonText": "[[category]]:<br/> <b>" + $scope.genres[i].libelle + "s [[value]]</b>",

                "fillAlphas": 1,
                "lineAlpha": 0.1,
                "type": "column",
                "valueField": $scope.genres[i].libelle
            });
        }
        $scope.tracerDiagrammeTrancheAge(donnees, graphVal);
    };

    $scope.tracerDiagrammeTrancheAge = function (data, graphVal) {
        var chartTrancheAge = AmCharts.makeChart("trancheAge", {
            "theme": "light",
            "type": "serial",
            "startDuration": 2,
            "dataProvider": data,
            "valueAxes": [{
                    "position": "left"
                }],
            "graphs": graphVal,
            "depth3D": 20,
            "angle": 30,
            "chartCursor": {
                "categoryBalloonEnabled": true,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "annee",
            "categoryAxis": {
                "gridPosition": "start",
                "labelRotation": 0
            },
            "export": {
                "enabled": true
            }

        });


    };


    $scope.debutTrancheAge = 20;
    $scope.finTrancheAge = 65;
    $scope.intervalleTrancheAge = 5;

    $scope.actualiserTrancheAge = function (d, f, i) {
        if (parseInt(d) > 0 && parseInt(f) > 0 && parseInt(i) > 0 && parseInt(i) <= (parseInt(f) - parseInt(d))) {
            if (parseInt(d) >= parseInt(f)) {
                SweetAlert.simpleNotification("error", "Erreur", "La valeur de début doit etre inférieure à celle de fin");
            } else {
                $scope.construireGrapheTranche(parseInt(d), parseInt(f), parseInt(i));
            }
        }
    };

    /*Trache age*/

    $scope.intervaleAnneeRecrutement = 5;
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function supprimerCouleur(colorsTab, index) {
        var tab = [];
        var j = 0;
        for (var i = 0; i < colorsTab.length; i++) {
            if (i !== index) {

                tab[j] = colorsTab[i];
                j++;
            }
        }

        return  tab;
    }

    /*Debut Niveau etude*/

    $scope.countEffectifParNiveauEtude = function () {
        var datas = [];
        if (angular.isUndefined($scope.selectedTypeInNiveauEtude)) {  //Pour le premier appel

            $scope.idType = $scope.typeEmploye_o[0].id;
        } else {
            $scope.idType = $scope.selectedTypeInNiveauEtude.id;
        }
        datas = $scope.allGrades.filter(retrieveTypeInGrade);
        if (datas.length > 0) {
            if (angular.isDefined(datas[0].grade.corps)) {  //Si corps est definie dans grade , alors c'est un per
                $scope.calculerEffectifPerParCorps(datas);
            } else {
                $scope.calculerEffectifPatsParClasse(datas);
            }
        }
    };
    var libelleCorps = "";
    var libelleClasse = "";
    $scope.calculerEffectifPerParCorps = function (datas) {
        var j = 0;
        var effectifsParCorps = [];
        var colors = ["#000000", "#A52A2A", "#DC143C", "#006400", "#1E90FF", "#2F4F4F", "#FFD700", "#FF69B4", "#ADFF2F", "#0000CD", "#FF4500", "#046380"];
        for (var i = 0; i <= $scope.corpsPer.length - 1; i++) {
            libelleCorps = $scope.corpsPer[i];

            j = getRandomInt(colors.length);
            var une_barre = {};
            une_barre.annee = $scope.corpsPer[i];
            une_barre.color = colors[j];
            une_barre.pourcentage = datas.filter(retrieveByCorps).length;
            effectifsParCorps.push(une_barre);

            colors = supprimerCouleur(colors, j); //Supprimer la couleur de la liste des couleurs:éviter répétition
        }
        $scope.tracerDiagrammeNiveauEtude(effectifsParCorps);
    };

    $scope.calculerEffectifPatsParClasse = function (datas) {
        var j = 0;
        var effectifsParClasse = [];
        var colors = ["#000000", "#A52A2A", "#DC143C", "#006400", "#1E90FF", "#2F4F4F", "#FFD700", "#FF69B4", "#ADFF2F", "#0000CD", "#FF4500", "#046380"];
        for (var i = 0; i <= $scope.classePats.length - 1; i++) {
            libelleClasse = $scope.classePats[i];

            j = getRandomInt(colors.length);
            var une_barre = {};
            une_barre.annee = $scope.classePats[i];
            une_barre.color = colors[j];
            une_barre.pourcentage = datas.filter(retrieveByClasse).length;
            effectifsParClasse.push(une_barre);

            colors = supprimerCouleur(colors, j); //Supprimer la couleur de la liste des couleurs:éviter répétition
        }
        $scope.tracerDiagrammeNiveauEtude(effectifsParClasse);
    };

    $scope.tracerDiagrammeNiveauEtude = function (donnees) {
        var chartNiveauEtude = AmCharts.makeChart("niveauEtude", {
            "theme": "light",
            "type": "serial",
            "startDuration": 2,
            "dataProvider": donnees,
            "valueAxes": [{
                    "position": "left"
                }],
            "graphs": [{
                    "balloonText": "[[category]]: <b>[[value]]</b>",
                    "fillColorsField": "color",
                    "fillAlphas": 1,
                    "lineAlpha": 0.1,
                    "type": "column",
                    "valueField": "pourcentage"
                }],
            "depth3D": 20,
            "angle": 30,
            "chartCursor": {
                "categoryBalloonEnabled": true,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "annee",
            "categoryAxis": {
                "gridPosition": "start",
                "labelRotation": 0
            },
            "export": {
                "enabled": true
            }

        });
    };

    /*- Fin niveau d'etude*/


});




