angular.module('StatistiqueModule').factory('StatistiqueEntite', function ($http) {

    return {
        
        getEmploye: function (typeEmploye) {
            return $http.get(chemin + '/webresources/sn.grh.servir/employeenservice/typeemploye/'+typeEmploye); 
        },
        countEmploye: function (entite) {
            /*CONNAITRE L'EFFECTIF DES EMPLOYES D'UNE ENTITE*/
            return $http.get(chemin + '/webresources/sn.grh.servir/effectif/' + entite);
        },

    };


});