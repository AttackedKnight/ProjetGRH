/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('CaisseSocialeTypeEmploye', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.caissesocialetypeemploye');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.caissesocialetypeemploye/' + id);
        },
        findByCaisseSociale: function (id) {    //Retourne la liste des types d'employe : une colonne de la table
            return $http.get(chemin + '/webresources/sn.grh.caissesocialetypeemploye/caissesociale/' + id);
        },
        findByType: function (type) {    //Retourne la liste des caisses concernant un type d'employe donné : une colonne de la table
            return $http.get(chemin + '/webresources/sn.grh.caissesocialetypeemploye/type/' + type);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.caissesocialetypeemploye', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.caissesocialetypeemploye/' + id);
        },
        deleteByCaisseSocialeAndTypeEmploye: function (item) {
            return $http.delete(chemin + '/webresources/sn.grh.caissesocialetypeemploye/caissesociale/' + item.caisse+'/typeemploye/'+item.typeemploye);
        },
        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.caissesocialetypeemploye/' + item.id, item);
        }
    };
});


