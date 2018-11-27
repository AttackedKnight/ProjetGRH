angular.module('StatistiqueModule').factory('Statistique', function ($http) {

    return {
        getEmploye: function (typeEmploye) {
            return $http.get(chemin + '/webresources/sn.grh.servir/onlyemployeenservice/typeemploye/'+typeEmploye);
        },
        countEmploye: function () {
            /*CONNAITRE L'EFFECTIF DES EMPLOYES D'UNE ENTITE*/
            return $http.get(chemin + '/webresources/sn.grh.servir/effectif');
        }

    };


});
