/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('ParametrageModule').factory('Grade', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.grade');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.grade/' + id);
        },
        findLast: function (nombre) {
            return $http.get(chemin + '/webresources/sn.grh.grade/nombre/' + nombre);
        },
        findById: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.grade/id/' + id);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.grade', item);
        },

        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.grade/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.grade/' + item.id, item);
        }
    };
});
