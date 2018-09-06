/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('Niveau', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.niveau');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.niveau/' + id);
        },

        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.niveau', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.niveau/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.niveau/' + item.id, item);
        }
    };
});
