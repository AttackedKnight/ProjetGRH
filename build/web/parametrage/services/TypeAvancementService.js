/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('Avancement', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.typeavancement');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.typeavancement/' + id);
        },

        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.typeavancement', item);
        },

        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.typeavancement/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.typeavancement/' + item.id, item);
        }
    };
});
