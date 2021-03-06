/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('Grade', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.grade');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.grade/' + id);
        },
        findByEmploye: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.grade/employe/' + e.id);
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
