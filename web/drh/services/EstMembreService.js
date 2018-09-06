/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('EstMembre', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.estmembre');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.estmembre/' + id);
        },
        findByEmploye: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.estmembre/employe/' + e.id);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.estmembre', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.estmembre/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.estmembre/' + item.id, item);
        }
    };
});
