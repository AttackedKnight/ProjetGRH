angular.module('StatistiqueModule').controller('StatistiquePEREntiteController', function ($scope,$rootScope, $cookies, $q, Entite,GroupeTypeEmploye,SweetAlert, Securite, StatistiqueEntite) {

    /*  Verifier que l'utilisateur est connecte:controles supplementaire     */

    if (Securite.estConnecte() == false) {
        document.location.href = "#/";
        return;
    }
    $('#statistique-drh li').eq(0).trigger('click');
    /*  Verifier que l'utilisateur est connecte:controles supplementaire =>fin     */
    
    GroupeTypeEmploye.findByGroupe($rootScope.groupeUtilisateur.id).success(function (data) {
          for(var i=0;i<data.length;i++){
              if(data[i].code=="PER"){
                  $scope.idTypePer=data[i].id;
              }
              if(data[i].code=="PATS"){
                  $scope.idTypePats=data[i].id;
              }
          }
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des type d'employ� !");
    });
    

    $scope.hgt = {height: 360 + 'px'};
    $scope.hgt2 = {height: 360 + 'px'};

    Entite.findAll().success(function (data) {
        $scope.entites = data;
        if (!$cookies.get('entiteChoisie'))
        {
            $scope.entiteChoisie = data[1];
            /*Garder entite selectionne dans un cookie*/
            $cookies.putObject('entiteChoisie', $scope.entiteChoisie);
            console.log('cookie entite choisie cree');

        } else {
            $scope.entiteChoisie = JSON.parse($cookies.get('entiteChoisie'));
            console.log('Utilisation du cookie entite choisie: ' + $scope.entiteChoisie);
        }

        $scope.montrerStatistique();
    }).error(function () {
        alert('Une erreur est survenue : entites');
    });

    $scope.changerEntite = function () {

        $scope.filles = [];
        /*Garder entite selectionne dans un cookie*/
        $cookies.putObject('entiteChoisie', $scope.entiteChoisie);
        $scope.montrerStatistique();
    };
    $scope.filles = [];

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

    $scope.montrerStatistique = function () {

        $scope.filles = $scope.getEntitesFille();

        $scope.countemploye = function () {

            $scope.effectifemploye = 0;
            var req_tab = [];

            for (var i = 0; i < $scope.filles.length; i++)
            {
                req_tab.push(StatistiqueEntite.countemployeEntite($scope.filles[i]));
            }

            $q.all(req_tab).then(function (result) {
                for (var i = 0; i < result.length; i++)
                {
                    $scope.effectifemploye += parseInt(result[i].data);
                }
                $scope.countemployeper();
            });

        };
        $scope.countemploye();

        $scope.countemployeper = function () {

            $scope.effectifemployeper = 0;
            var req_tab = [];

            for (var i = 0; i < $scope.filles.length; i++)
            {
                req_tab.push(StatistiqueEntite.countemployeperEntite($scope.filles[i]));
            }

            $q.all(req_tab).then(function (result) {
                for (var i = 0; i < result.length; i++)
                {
                    $scope.effectifemployeper += parseInt(result[i].data);
                }
                $scope.countemployehommeper();
            });

        };



        $scope.effectifTotalHommePer = 0;
        $scope.effectifTotalFemmePer = 0;

        $scope.countemployehommeper = function () {

            $scope.effectifTotalHommePer = 0;
            var req_tab = [];

            for (var i = 0; i < $scope.filles.length; i++)
            {
                req_tab.push(StatistiqueEntite.countemployehommeperEntite($scope.filles[i]));
            }

            $q.all(req_tab).then(function (result) {
                for (var i = 0; i < result.length; i++)
                {
                    $scope.effectifTotalHommePer += parseInt(result[i].data);
                }
                $scope.countemployefemmeper();
            });

        };



        $scope.countemployefemmeper = function () {

            $scope.effectifTotalFemmePer = 0;
            var req_tab = [];

            for (var i = 0; i < $scope.filles.length; i++)
            {
                req_tab.push(StatistiqueEntite.countemployefemmeperEntite($scope.filles[i]));
            }

            $q.all(req_tab).then(function (result) {
                for (var i = 0; i < result.length; i++)
                {
                    $scope.effectifTotalFemmePer += parseInt(result[i].data);
                }
                $scope.pourcentagePer = (($scope.effectifemployeper / $scope.effectifemploye) * 100).toFixed(2);
                $scope.pourcentageHommesPer = (($scope.effectifTotalHommePer / $scope.effectifemployeper) * 100).toFixed(2);
                $scope.pourcentageFemmesPer = (($scope.effectifTotalFemmePer / $scope.effectifemployeper) * 100).toFixed(2);


                /*  Statistiques PATS / PER      */
                var chartPatsPer = AmCharts.makeChart("statPatsPer", {
                    "type": "pie",
                    "startDuration": 1,
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
                    "dataProvider": [{
                            "categorie": "PATS",
                            "pourcentage": (100 - $scope.pourcentagePer).toFixed(2)

                        }, {
                            "categorie": "PER",
                            "pourcentage": $scope.pourcentagePer

                        }],
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

                chartPatsPer.addListener("init", handleInit);

                chartPatsPer.addListener("rollOverSlice", function (e) {
                    handleRollOver(e);
                });

                function handleInit() {
                    chartPatsPer.legend.addListener("rollOverItem", handleRollOver);
                }

                /*   Fin StatistiqueEntites PATS / PER      */

                /*  Statistiques Hommes et Femmes     */
                var chartHomFem = AmCharts.makeChart("statHomFem", {
                    "type": "pie",
                    "startDuration": 1,
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
                    "dataProvider": [{
                            "genre": "Hommes",
                            "pourcentage": $scope.pourcentageHommesPer
                        }, {
                            "genre": "Femmes",
                            "pourcentage": $scope.pourcentageFemmesPer
                        }],
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

                chartHomFem.addListener("init", handleInit);

                chartHomFem.addListener("rollOverSlice", function (e) {
                    handleRollOver(e);
                });


                /*   Fin StatistiqueEntites Hommes et Femmes      */

                function handleRollOver(e) {
                    var wedge = e.dataItem.wedge.node;
                    wedge.parentNode.appendChild(wedge);
                }


            });
        };

        /*Trache age*/

        $scope.today = new Date();

        $scope.trancheAge = function (debut, fin) {

            var from = new Date();
            var to = new Date();

            from.setFullYear(from.getFullYear() - debut);

            to.setFullYear(to.getFullYear() - fin);

            var debut = from.getFullYear() + '-' + (from.getMonth() + 1) + '-' + from.getDate();
            var fin = to.getUTCFullYear() + '-' + (to.getUTCMonth() + 1) + '-' + to.getUTCDate();

            var dates = debut + '/' + fin;

            return dates;
        };

        $scope.construireGrapheTranche = function (debut, fin, intervalle) {
            $scope.donnees = [];

            var end = debut + intervalle;

            var intervalle_date;
            var date1;
            var date2;

            var req_h = [];
            var req_f = [];
            /*Creation de l'objet a afficher sur le graphe*/
            while (end <= fin) {
                intervalle_date = $scope.trancheAge(debut, end);
                date1 = intervalle_date.split('/')[0];
                date2 = intervalle_date.split('/')[1];
                var une_barre = {};
                une_barre.annee = debut + '-' + end;

                $scope.donnees.push(une_barre);

                debut = end;
                end = debut + intervalle;

                for (var i = 0; i < $scope.filles.length; i++)
                {
                    req_h.push(StatistiqueEntite.trancheagehommesperEntite($scope.filles[i], date1, date2));
                }

                for (var i = 0; i < $scope.filles.length; i++)
                {
                    req_f.push(StatistiqueEntite.trancheagefemmesperEntite($scope.filles[i], date1, date2));
                }
            }

            $q.all(req_h).then(function (result) {
                var indice_barre = 0;
                var cmp_entites_filles = 0;
                var hom_e = 0;
                var fem_e = 0;

                for (var b = 0; b < result.length; b++) {
                    hom_e += parseInt(result[b].data);
                    cmp_entites_filles++;
                    if (cmp_entites_filles == $scope.filles.length && indice_barre < $scope.donnees.length) {
                        $scope.donnees[indice_barre].hommes = hom_e;
                        cmp_entites_filles = 0;
                        hom_e = 0;
                        indice_barre += 1;
                    }
                }

                $q.all(req_f).then(function (result) {
                    var indice_barre = 0;
                    var cmp_entites_filles = 0;
                    for (var b = 0; b < result.length; b++) {
                        fem_e += parseInt(result[b].data);
                        cmp_entites_filles++;
                        if (cmp_entites_filles == $scope.filles.length && indice_barre < $scope.donnees.length) {
                            $scope.donnees[indice_barre].femmes = fem_e;
                            cmp_entites_filles = 0;
                            fem_e = 0;
                            indice_barre += 1;
                        }
                    }

                    /*Dessiner le graphe Tranche d'age*/
                    $scope.tracerDiagrammeTrancheAge($scope.donnees);


                });
            });

            /*Dessiner le graphe Tranche d'age*/

        };

        $scope.tracerDiagrammeTrancheAge = function (donnees) {
            var chartTrancheAge = AmCharts.makeChart("trancheAge", {
                "theme": "light",
                "type": "serial",
                "startDuration": 2,
                "dataProvider": donnees,
                "valueAxes": [{
                        "position": "left"
                    }],
                "graphs": [{
                        "balloonText": "[[category]]:<br/> <b> Hommes [[value]]</b>",

                        "fillAlphas": 1,
                        "lineAlpha": 0.1,
                        "type": "column",
                        "valueField": "hommes"
                    }, {
                        "balloonText": "[[category]]:<br/> <b> Femmmes [[value]]</b>",

                        "fillAlphas": 1,
                        "lineAlpha": 0.1,
                        "type": "column",
                        "valueField": "femmes"
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

        $scope.debutTrancheAge = 20;
        $scope.finTrancheAge = 65;
        $scope.intervalleTrancheAge = 5;

        $scope.construireGrapheTranche($scope.debutTrancheAge, $scope.finTrancheAge, $scope.intervalleTrancheAge);

        $scope.actualiserTrancheAge = function (d, f, i) {
            if (parseInt(d) > 0 && parseInt(f) > 0 && parseInt(i) > 0) {
                if (parseInt(d) > parseInt(f)) {
                    alert('La valeur de début doit etre inférieure à celle de fin');
                } else {
                    $scope.construireGrapheTranche(parseInt(d), parseInt(f), parseInt(i));
                }
            }


        };


        /*Trache age*/


        /*Debut Niveau etude*/

        $scope.calculerEffectifPerParCorps = function () {
            var corps = ['Professeur', 'Maître de conférence', 'Assistant'];
            var j = 0;
            var req_corps = [];
            $scope.effectifsParCorps = [];

            var colors = ["#000000", "#A52A2A", "#DC143C", "#006400", "#1E90FF", "#2F4F4F", "#FFD700", "#FF69B4", "#ADFF2F", "#0000CD", "#FF4500", "#046380"];
            for (var i = 0; i <= corps.length - 1; i++) {
                j = getRandomInt(colors.length);

                var une_barre = {};
                une_barre.annee = corps[i];
                une_barre.color = colors[j];

                colors = supprimerCouleur(colors, j); //Supprimer la couleur de la liste des couleurs:éviter répétition

                $scope.effectifsParCorps.push(une_barre);

                for (var j = 0; j < $scope.filles.length; j++)
                {

                    req_corps.push(StatistiqueEntite.compterPerDeCorpsEntite($scope.filles[j], corps[i]));
                }

            }
            $q.all(req_corps).then(function (result) {

                var indice_barre = 0;
                var cmp_entites_filles = 0;
                var cumul = 0;

                for (var b = 0; b < result.length; b++) {
                    cumul += parseInt(result[b].data);
                    cmp_entites_filles++;
                    if (cmp_entites_filles == $scope.filles.length && indice_barre < $scope.effectifsParCorps.length) {
                        $scope.effectifsParCorps[indice_barre].pourcentage = cumul;
                        cmp_entites_filles = 0;
                        cumul = 0;
                        indice_barre += 1;
                    }
                }

                $scope.tracerDiagrammePerParCorps($scope.effectifsParCorps);
            });
        };

        $scope.calculerEffectifPerParCorps();

        $scope.tracerDiagrammePerParCorps = function (donnees) {
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

        /*Debut RECRUTEMENT*/



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

        $scope.countRecrutement = function (nombreAnnees) {
            $scope.recrutements = [];

            var colors = ["#000000", "#A52A2A", "#DC143C", "#006400", "#1E90FF", "#2F4F4F", "#FFD700", "#FF69B4", "#ADFF2F", "#0000CD", "#FF4500", "#046380"];

            var d = new Date();
            var n = d.getFullYear();

            var debutAnnee;
            var finAnnee;
            var i = 0;

            var req_recru = [];
            /*Creation de l'objet a afficher sur le graphe*/
            while (nombreAnnees > 0) {

                //Recrutements effectues entre le 1 janvier et le 31 decembre de l'annee
                debutAnnee = n + '-01-01';
                finAnnee = n + '-12-31';
                //Recrutements effectues entre le 1 janvier et le 31 decembre de l'annee

                i = getRandomInt(colors.length);

                var une_barre = {};
                une_barre.annee = parseInt(n);
                une_barre.color = colors[i];

                colors = supprimerCouleur(colors, i); //Supprimer la couleur de la liste des couleurs:éviter répétition

                $scope.recrutements.push(une_barre);

                for (var i = 0; i < $scope.filles.length; i++)
                {
                    req_recru.push(StatistiqueEntite.compterRecrutementPerEntite($scope.filles[i], debutAnnee, finAnnee));
                }
                n -= 1;
                nombreAnnees--;
            }

            $q.all(req_recru).then(function (result) {
                var indice_barre = 0;
                var cmp_entites_filles = 0;
                var cumul = 0;

                for (var b = 0; b < result.length; b++) {
                    cumul += parseInt(result[b].data);
                    cmp_entites_filles++;
                    if (cmp_entites_filles == $scope.filles.length && indice_barre < $scope.recrutements.length) {
                        $scope.recrutements[indice_barre].pourcentage = cumul;
                        cmp_entites_filles = 0;
                        cumul = 0;
                        indice_barre += 1;
                    }
                }

                $scope.recrutements.reverse();

                $scope.tracerDiagrammeRecrutementParAnnee($scope.recrutements);

            });

        };

        $scope.tracerDiagrammeRecrutementParAnnee = function (recrutements) {
            var chartnbreRecrutement = AmCharts.makeChart("statNbreRecrutement", {
                "theme": "light",
                "type": "serial",
                "startDuration": 2,
                "dataProvider": recrutements,
                "valueAxes": [{
                        "position": "left"
                    }],
                "graphs": [{
                        "balloonText": "[[category]]: <b>[[value]]</b><br/>",
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

        $scope.intervaleAnneeRecrutement = 5;

        $scope.countRecrutement($scope.intervaleAnneeRecrutement);

        $scope.voirRecrutement = function (n) {
            if (parseInt(n) > 0) {
                $scope.countRecrutement(parseInt(n));
            }
        };

        /*- Fin RECRUTEMENT*/


        /* DEBUT entree sortie*/
        var chartEntreeSortie = AmCharts.makeChart("entreeSortie", {
            "type": "serial",
            "theme": "light",

            "marginBottom": 50,
            "dataProvider": [{
                    "age": "2007",
                    "entrees": 2,
                    "sorties": -3.0
                }, {
                    "age": "2008",
                    "entrees": 3,
                    "sorties": -3
                }, {
                    "age": "2009",
                    "entrees": 4,
                    "sorties": -4
                }, {
                    "age": "2010",
                    "entrees": 5,
                    "sorties": -4
                }, {
                    "age": "2010",
                    "entrees": 5,
                    "sorties": -4
                }, {
                    "age": "2011",
                    "entrees": 6,
                    "sorties": -5
                }, {
                    "age": "2012",
                    "entrees": 3,
                    "sorties": -2
                }, {
                    "age": "2013",
                    "entrees": 3,
                    "sorties": -4
                }, {
                    "age": "2014",
                    "entrees": 4,
                    "sorties": -1
                }, {
                    "age": "2015",
                    "entrees": 5,
                    "sorties": -4
                }],
            "startDuration": 1,
            "graphs": [{
                    "fillAlphas": 0.8,
                    "lineAlpha": 0.2,
                    "type": "column",
                    "valueField": "entrees",
                    "title": "entrees",
                    "labelText": "[[value]]",
                    "clustered": false,
                    "labelFunction": function (item) {
                        return Math.abs(item.values.value);
                    },
                    "balloonFunction": function (item) {
                        return item.category + ": " + Math.abs(item.values.value);
                    }
                }, {
                    "fillAlphas": 0.8,
                    "lineAlpha": 0.2,
                    "type": "column",
                    "valueField": "sorties",
                    "title": "sorties",
                    "labelText": "[[value]]",
                    "clustered": false,
                    "labelFunction": function (item) {
                        return Math.abs(item.values.value);
                    },
                    "balloonFunction": function (item) {
                        return item.category + ": " + Math.abs(item.values.value);
                    }
                }],
            "categoryField": "age",
            "categoryAxis": {
                "gridPosition": "start",
                "gridAlpha": 0.2,
                "axisAlpha": 0
            },
            "valueAxes": [{
                    "gridAlpha": 0,
                    "ignoreAxisWidth": true,

                    "guides": [{
                            "value": 0,
                            "lineAlpha": 0.1
                        }]
                }],
            "balloon": {
                "fixedPosition": true
            },
            "depth3D": 10,
            "angle": 20,
            "chartCursor": {
                "valueBalloonsEnabled": false,
                "cursorAlpha": 0.05,
                "fullWidth": true
            },
            "allLabels": [{
                    "text": "entrees",
                    "size": 14,
                    "x": "1%",
                    "color": "red",
                    "y": "0%",
                    "bold": true,
                    "align": "top"
                }, {
                    "text": "sorties",
                    "size": 14,
                    "color": "red",
                    "x": "1%",
                    "y": "96%",
                    "bold": true,
                    "align": "bottom"
                }]

        });

        /* FIN entree sortie*/


        /*DEBUT METIER*/

        var chart = AmCharts.makeChart("statFonction", {
            "type": "pie",
            "startDuration": 1,
            "theme": "light",
            "addClassNames": true,
            "legend": {
                "position": "right",
                "marginRight": 100,
                "autoMargins": false
            },
            "innerRadius": "10%",
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
            "dataProvider": [{
                    "metier": "secretaire",
                    "nombre": 50
                }, {
                    "metier": "directeur",
                    "nombre": 10
                }, {
                    "metier": "chauffeur",
                    "nombre": 10
                }, {
                    "metier": "informaticien",
                    "nombre": 16
                }, {
                    "metier": "gardien",
                    "nombre": 13
                }, {
                    "metier": "videur",
                    "nombre": 12
                }, {
                    "metier": "cadre",
                    "nombre": 50
                }],
            "valueField": "nombre",
            "titleField": "metier",
            "export": {
                "enabled": true
            }
        });

        chart.addListener("init", handleInit);

        chart.addListener("rollOverSlice", function (e) {
            handleRollOver(e);
        });

        function handleInit() {
            chart.legend.addListener("rollOverItem", handleRollOver);
        }

        function handleRollOver(e) {
            var wedge = e.dataItem.wedge.node;
            wedge.parentNode.appendChild(wedge);
        }
        /* FIN METIER*/



    };
});


