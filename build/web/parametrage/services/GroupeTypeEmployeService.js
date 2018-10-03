/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('GroupeTypeEmploye', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.groupetypeemploye');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.groupetypeemploye/' + id);
        },
        findByGroupe: function (id) {    //Retourne la liste des types d'employe : une colonne de la table
            return $http.get(chemin + '/webresources/sn.grh.groupetypeemploye/groupe/' + id);
        },
        findIDListByGroupe: function (id) {    //Retourne la liste des types d'employe : une colonne de la table
            return $http.get(chemin + '/webresources/sn.grh.groupetypeemploye/idtype/groupe/' + id);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.groupetypeemploye', item);
        },

        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.groupetypeemploye/' + id);
        },
        deleteByGroupeAndTypeEmploye: function (item) {
            return $http.delete(chemin + '/webresources/sn.grh.groupetypeemploye/groupe/' + item.groupe+'/typeemploye/'+item.typeemploye);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.groupetypeemploye/' + item.id, item);
        }
    };
});


