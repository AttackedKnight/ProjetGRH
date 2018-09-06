/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('Groupe', function ($http)
{
    return {
        getGroupes: function () {
            return $http.get(chemin + '/webresources/sn.grh.groupe');
        },
        getGroupe: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.groupe/' + id);
        },
        findByLibelle: function (libelle) {
            return $http.get(chemin + '/webresources/sn.grh.groupe/libelle/' + libelle);
        },
        editGroupe: function (groupe) {
            return $http.put(chemin + '/webresources/sn.grh.groupe/' + groupe.id, groupe);
        },
        getLastGroupe: function () {
            return $http.get(chemin + '/webresources/sn.grh.groupe/dernier');
        },
        newGroupe: function (groupe) {
            return $http.post(chemin + '/webresources/sn.grh.groupe', groupe);
        },
        deleteGroupe: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.groupe/' + id);
        },
        listerTable: function () {
            return $http.get(chemin + '/webresources/sn.grh.groupe/tables');

        }
    };
});
