/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('Classe', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.classe');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.classe/' + id);
        },

        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.classe', item);
        },

        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.classe/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.classe/' + item.id, item);
        }
    };
});
