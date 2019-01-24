/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('DrhModule').factory('MembreSyndicat', function ($http) {
    return{

        findAll: function () {
            return $http.get(chemin + '/webresources/sn.grh.membresyndicat');
        },
        find: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.membresyndicat/' + id);
        },
        findByEmploye: function (e) {
            return $http.get(chemin + '/webresources/sn.grh.membresyndicat/employe/' + e.id);
        },
        findLast: function (id) {
            return $http.get(chemin + '/webresources/sn.grh.membresyndicat/employe/last/'+id);
        },
        add: function (item) {
            return $http.post(chemin + '/webresources/sn.grh.membresyndicat', item);
        },
        delete: function (id) {
            return $http.delete(chemin + '/webresources/sn.grh.membresyndicat/' + id);
        },

        edit: function (item) {
            return $http.put(chemin + '/webresources/sn.grh.membresyndicat/' + item.id, item);
        }
    };
});
