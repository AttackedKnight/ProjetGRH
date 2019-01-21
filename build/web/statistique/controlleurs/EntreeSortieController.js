angular.module('StatistiqueModule').controller('EntreeSortieController', function ($scope, $rootScope, $routeParams,
        SweetAlert, Genre, Entite, Servir) {

    $scope.genres = [];
    $scope.totalEmployes = [];
    $scope.allEmployes = [];
    $scope.filles = [];
    $scope.IdFilles = [];
    $scope.intervaleAnnee = 5;
    $scope.entreesSorties = [];
    $scope.allEntreesSorties = [];
    $scope.allEntities = true;

    if ($routeParams.entite) {   //C'est un chef de service qui s'est connecte : Il ne voit que les stats de son service
        $scope.onlyOneService = true;
        $scope.allEntities = false;
    }
    /*Recuperer la liste de tous les employe(Une seule fois, puis filtrer en fonction de besoins)*/
    Servir.findAllEmploye($rootScope.typeEmployeAssocie.join("-")).success(function (data) {
        $scope.totalEmployes = data;
        $scope.getGenres();
    }).error(function () {
        SweetAlert.finirChargementEchec("Erreur de chargement des employ√©s !");
    });

    $scope.getGenres = function () {
        Genre.findAll().success(function (data) {
            $scope.genres = data;
            $scope.getEntites();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des genres");
        });
    };

    $scope.getEntites = function () {
        Entite.findAll().success(function (data) {
            $scope.entites = data;
            if ($routeParams.entite) {   //C'est un chef de service qui s'est connecte : Il ne voit que les stats de son service
                $scope.idEntite = $routeParams.entite;
                $scope.entiteSelectionnee = $scope.entites.filter(retrieveEntity)[0];
            } else {
                $scope.entiteSelectionnee = data[0]; //Selectionner une entite par defaut
            }
            $scope.montrerStatistique();
        }).error(function () {
            SweetAlert.finirChargementEchec("Erreur de chargement des entites !");
        });
    };

    $scope.getEntitesFille = function () {
        $scope.IdFilles = [];
        for (var i = 0; i < $scope.entites.length; i++) {
            if ($scope.estEnfant($scope.entites[i], $scope.entiteChoisie) == true) {
                $scope.IdFilles.push($scope.entites[i].id);
            }
        }
    };

    /*Le principe consisite a remonte les parent de l'entite en question
     * 
     * pour voir si on vas tomber sur l'entite parent indique en second parametre */
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

    $scope.changeTypeView = function () {
        $scope.montrerStatistique();
    };
    /*Changer l'entite sur laquelle les statistiques sont effectuees*/
    $scope.changerEntite = function () {
        $scope.montrerStatistique();
    };

    $scope.idEntite;
    $scope.getEmployeEntite = function () {
        var employes = [];
        var results = [];
        for (var i = 0; i < $scope.IdFilles.length; i++) {
            $scope.idEntite = $scope.IdFilles[i];
            results = $scope.totalEmployes.filter(retrieveEntite);
            employes = employes.concat(results);
        }
        return employes;
    };

    /*Filtre sur les donnÈes*/
    function retrieveEntite(data) {
        return data.entite.id == $scope.idEntite;
    }
    function retrieveEntity(data) {
        return data.id == $scope.idEntite;
    }
    function retrieveAnneeDebutBetween(data) {
        var dateDebut = new Date(data.debut);
        dateDebut = new Date(dateDebut.getFullYear() + '-' + (dateDebut.getMonth() + 1) + '-' + dateDebut.getDate());
        return dateDebut >= dateDebutMin && dateDebut <= dateDebutMax;
    }
    function retrieveAnneeFinBetween(data) {
        var dateFin = new Date(data.fin);
        dateFin = new Date(dateFin.getFullYear() + '-' + (dateFin.getMonth() + 1) + '-' + dateFin.getDate());
        return dateFin >= dateFinMin && dateFin <= dateFinMax;
    }
    $scope.idType;
    function retrieveType(data) {
        return data.employe.typeEmploye.id == $scope.idType;
    }
    $scope.idGenre;
    function retrieveGenre(data) {
        return data.employe.genre.id == $scope.idGenre;
    }
    function retrieveSortie(data) {
        return data.finService == true;
    }
    /*Filtre sur les donnÈes*/

    Array.prototype.groupBy = function (funcProp) {
        return this.reduce(function (acc, val) {
            (acc[funcProp(val)] = acc[funcProp(val)] || []).push(val);
            return acc;
        }, {});
    };
    function getMinDateDebut(tabParcours) {
        return tabParcours.reduce((min, p) => p.debut < min.debut ? p : min, tabParcours[0]);
    }
    function getMaxDateFin(tabParcours) {
        return tabParcours.reduce(function (max, p) {
            if (angular.isDefined(max.fin) && angular.isDefined(max.fin)) {
                if (max.fin > p.fin)
                    return max;
                return p;
            }
            return max;
        }, tabParcours[0]);
    }
    function getEntrees(employes) {
        var groupedByEmploye = employes.groupBy(emp => emp.employe.id);
        const groupedByEmployeValues = Object.values(groupedByEmploye);
        var entrees = [];
        for (var i = 0; i < groupedByEmployeValues.length; i++) {
            if (groupedByEmployeValues[i].length > 1) {  /*Si plusieurs poste occupe au sein du meme entite, recuperer la date debut de la plus ancienne*/
                entrees.push(getMinDateDebut(groupedByEmployeValues[i]));
            } else {
                entrees.push(groupedByEmployeValues[i][0]);
            }
        }
        return entrees;
    }

    function getSorties(employes) {
        var groupedByEmploye = employes.groupBy(emp => emp.employe.id);
        const groupedByEmployeValues = Object.values(groupedByEmploye);
        var sorties = [];
        for (var i = 0; i < groupedByEmployeValues.length; i++) {
            if (groupedByEmployeValues[i].length > 1) {  /*Si plusieurs poste occupe au sein du meme entite, recuperer la date debut de la plus ancienne*/
                sorties.push(getMaxDateFin(groupedByEmployeValues[i]));
            } else {
                sorties.push(groupedByEmployeValues[i][0]);
            }
        }
        return sorties;
    }

    $scope.montrerStatistique = function () {
        var ligneEntreesSorties = {};
        var employesEntite = [];
        $scope.allEntreesSorties = [];
        if ($scope.allEntities == true) {   //Vue general des entrees-sorties
            for (var i = 0; i < $scope.entites.length; i++) {
                $scope.entiteChoisie = $scope.entites[i];
                ligneEntreesSorties.entite = $scope.entiteChoisie;
                $scope.getEntitesFille();
                employesEntite = $scope.getEmployeEntite();
                ligneEntreesSorties.entrees = getEntrees(employesEntite);
                ligneEntreesSorties.sorties = getSorties(employesEntite).filter(retrieveSortie);
                $scope.allEntreesSorties.push(ligneEntreesSorties);
                ligneEntreesSorties = {};
            }
        } else {    //Entrees-Sorties pour une entite donnee
            $scope.entiteChoisie = $scope.entiteSelectionnee;
            ligneEntreesSorties.entite = $scope.entiteChoisie;
            $scope.getEntitesFille();
            employesEntite = $scope.getEmployeEntite();
            ligneEntreesSorties.entrees = getEntrees(employesEntite);
            ligneEntreesSorties.sorties = getSorties(employesEntite).filter(retrieveSortie);
            $scope.allEntreesSorties.push(ligneEntreesSorties);
            ligneEntreesSorties = {};
        }

        $scope.countEntreeSortie($scope.intervaleAnnee);
    };

    var dateDebutMin;
    var dateDebutMax;
    var dateFinMin;
    var dateFinMax;
    $scope.countEntreeSortie = function (nombreAnnees) {
        
        $scope.entreesSorties = angular.copy($scope.allEntreesSorties);       
        /*Appliquer le(s) filtre(s) si c'est defini*/
        if (angular.isDefined($scope.selectedTypePersonnel) && angular.isDefined($scope.selectedTypePersonnel.id)) {  //S'il y a un type de personnel cible, on filtre selon ce type d'abord
            $scope.idType = $scope.selectedTypePersonnel.id;
            for (var i = 0; i < $scope.entreesSorties.length; i++) {
                $scope.entreesSorties[i].entrees = $scope.entreesSorties[i].entrees.filter(retrieveType);
                $scope.entreesSorties[i].sorties = $scope.entreesSorties[i].sorties.filter(retrieveType);
            }
        }
        if (angular.isDefined($scope.selectedGenre) && angular.isDefined($scope.selectedGenre.id)) {  //S'il y a un genre cible, on filtre selon ce type d'abord
            $scope.idGenre = $scope.selectedGenre.id;
            for (var i = 0; i < $scope.entreesSorties.length; i++) {
                $scope.entreesSorties[i].entrees = $scope.entreesSorties[i].entrees.filter(retrieveGenre);
                $scope.entreesSorties[i].sorties = $scope.entreesSorties[i].sorties.filter(retrieveGenre);
            }
        }
        
        var d = new Date();
        var n;
        var data = [];
        var uneAnnee = {};
        var index = 0;
        var nbrAnnee;  
        $scope.totalEntrees = 0;
        $scope.totalSorties = 0;        
        $scope.totalEntreesSortiesParAnnee = [];
        $scope.annees = [];         
        /*Affichage des annees sur les colonnes*/
        
        n = d.getFullYear();
        nbrAnnee = nombreAnnees;
        while (nbrAnnee > 0) {
            //Prise de service entre le 1 janvier et le 31 decembre de l'annee
            $scope.annees.push(n);
            $scope.totalEntreesSortiesParAnnee.push({annee: n, totalEntrees: 0, totalSorties: 0});
            n -= 1;
            nbrAnnee--;
        }
        $scope.annees.reverse();
        /*Affichage des annees sur les colonnes*/

        /*Creation de l'objet a afficher sur les lignes*/
        for (var i = 0; i < $scope.entreesSorties.length; i++) {
            data = [];
            uneAnnee = {};
            nbrAnnee = nombreAnnees;
            n = d.getFullYear();
            index = 0;

            /*Total entrees/sorties par entite sur l'intervalle d'annee donne (somme des colonnes d'une ligne)*/
            dateDebutMin = new Date((n - nbrAnnee) + '-12-31');
            dateDebutMax = new Date(n + '-12-31');
            dateFinMin = new Date((n - nbrAnnee) + '-12-31');
            dateFinMax = new Date(n + '-12-31');
            $scope.entreesSorties[i].totalEntreesSurIntervalAnnee =
                    ($scope.entreesSorties[i].entrees.filter(retrieveAnneeDebutBetween)).length;
            $scope.entreesSorties[i].totalSortiesSurIntervalAnnee =
                    ($scope.entreesSorties[i].sorties.filter(retrieveAnneeFinBetween)).length;

            /*Total entrees/sorties par entite par annee sur l'intervalle d'annee donne (colonnes d'une ligne)*/
            while (nbrAnnee > 0) {
                //Prise ou fin de service entre le 1 janvier et le 31 decembre de l'annee
                dateDebutMin = new Date(n + '-01-01');
                dateDebutMax = new Date(n + '-12-31');
                dateFinMin = new Date(n + '-01-01');
                dateFinMax = new Date(n + '-12-31');
                uneAnnee.annee = n;
                uneAnnee.entrees = ($scope.entreesSorties[i].entrees.filter(retrieveAnneeDebutBetween)).length;
                uneAnnee.sorties = ($scope.entreesSorties[i].sorties.filter(retrieveAnneeFinBetween)).length;
                /*Total entrees et total sorties sur l'intervalle d'annees*/
                $scope.totalEntrees += uneAnnee.entrees;
                $scope.totalSorties += uneAnnee.sorties;
                /*Total entrees/sorties par annee*/
                $scope.totalEntreesSortiesParAnnee[index].totalEntrees += uneAnnee.entrees;
                $scope.totalEntreesSortiesParAnnee[index].totalSorties += uneAnnee.sorties;
                data.push(uneAnnee);
                uneAnnee = {};
                n -= 1;
                nbrAnnee--;
                index++;
            }
            data.reverse();
            $scope.entreesSorties[i].io_data = data;
        }
        $scope.totalEntreesSortiesParAnnee.reverse();
    };
});




