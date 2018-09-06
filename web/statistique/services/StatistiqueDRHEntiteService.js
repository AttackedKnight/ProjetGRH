angular.module('StatistiqueModule').factory('StatistiqueEntite', function ($http) {

    return {

        countemployeEntite: function (e) {

            return $http.get(chemin + '/webresources/sn.grh.servir/countemploye/' + e.id);
        },
        countemployepatsEntite: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.servir/countemployepats/' + e.id);
        },
        countemployeperEntite: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.servir/countemployeper/' + e.id);
        },
        countemployehommeEntite: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.servir/countemployehommes/' + e.id);
        },
        countemployehommeperEntite: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.servir/countemployehommesper/' + e.id);
        },
        countemployehommepatsEntite: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.servir/countemployehommespats/' + e.id);
        },
        countemployefemmeEntite: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.servir/countemployefemmes/' + e.id);
        },
        countemployefemmeperEntite: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.servir/countemployefemmesper/' + e.id);
        },
        countemployefemmepatsEntite: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.servir/countemployefemmespats/' + e.id);
        },
        trancheageEntite: function (e, debut, fin) {

            return $http.get(chemin + '/webresources/sn.grh.servir/trancheage/' + debut + '/' + fin + '/' + e.id);
        }
        ,
        trancheagehommesEntite: function (e, debut, fin) {

            return $http.get(chemin + '/webresources/sn.grh.servir/trancheage/homme/' + debut + '/' + fin + '/' + e.id);
        }
        ,
        trancheagefemmesEntite: function (e, debut, fin) {

            return $http.get(chemin + '/webresources/sn.grh.servir/trancheage/femme/' + debut + '/' + fin + '/' + e.id);
        },
        trancheagehommesperEntite: function (e, debut, fin) {

            return $http.get(chemin + '/webresources/sn.grh.servir/trancheage/homme/per/' + debut + '/' + fin + '/' + e.id);
        }
        ,
        trancheagefemmesperEntite: function (e, debut, fin) {

            return $http.get(chemin + '/webresources/sn.grh.servir/trancheage/femme/per/' + debut + '/' + fin + '/' + e.id);
        },
        trancheagehommespatsEntite: function (e, debut, fin) {

            return $http.get(chemin + '/webresources/sn.grh.servir/trancheage/homme/pats/' + debut + '/' + fin + '/' + e.id);
        }
        ,
        trancheagefemmespatsEntite: function (e, debut, fin) {

            return $http.get(chemin + '/webresources/sn.grh.servir/trancheage/femme/pats/' + debut + '/' + fin + '/' + e.id);
        },
        compterRecrutementEntite: function (e, debut, fin) {
            return $http.get(chemin + '/webresources/sn.grh.servir/recrutement/' + debut + '/' + fin + '/' + e.id);
        },
        compterRecrutementPatsEntite: function (e, debut, fin) {
            return $http.get(chemin + '/webresources/sn.grh.servir/recrutement/pats/' + debut + '/' + fin + '/' + e.id);
        },
        compterRecrutementPerEntite: function (e, debut, fin) {
            return $http.get(chemin + '/webresources/sn.grh.servir/recrutement/per/' + debut + '/' + fin + '/' + e.id);
        },
        compterPatsDeClasseEntite: function (e, indice) {
            return $http.get(chemin + '/webresources/sn.grh.servir/pats/classe/' + indice + '/' + e.id);
        },
        compterPatsHommeDeClasseEntite: function (e, indice) {
            return $http.get(chemin + '/webresources/sn.grh.servir/pats/homme/classe/' + indice + '/' + e.id);
        },
        compterPatsFemmeDeClasseEntite: function (e, indice) {
            return $http.get(chemin + '/webresources/sn.grh.servir/pats/femme/classe/' + indice + '/' + e.id);
        },
        compterPerDeCorpsEntite: function (e, indice) {
            return $http.get(chemin + '/webresources/sn.grh.servir/per/corps/' + indice + '/' + e.id);
        },
        compterPerHommeDeCorpsEntite: function (e, indice) {
            return $http.get(chemin + '/webresources/sn.grh.servir/per/homme/corps/' + indice + '/' + e.id);
        },
        compterPerFemmeDeCorpsEntite: function (e, indice) {
            return $http.get(chemin + '/webresources/sn.grh.servir/per/femme/corps/' + indice + '/' + e.id);
        }

    };


});